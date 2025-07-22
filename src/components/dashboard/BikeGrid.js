'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BikeGrid() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await fetch('/api/bikes');
      const data = await response.json();
      setBikes(data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBikeStatus = async (bikeId, newStatus) => {
    try {
      await fetch(`/api/bikes/${bikeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchBikes(); // Refresh the list
    } catch (error) {
      console.error('Error updating bike:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Rented': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading bikes...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bikes.map((bike) => (
        <div key={bike._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {bike.image && (
            <div className="relative h-48 w-full">
              <Image
                src={bike.image}
                alt={`${bike.type} bike`}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {bike.bikeId}
            </h3>
            <p className="text-gray-600 mb-1">
              {bike.type} - {bike.size}
            </p>
            <p className="text-gray-500 mb-3">
              {bike.color}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bike.status)}`}>
                  {bike.status}
                </span>
              </div>
              
              <select 
                value={bike.status}
                onChange={(e) => updateBikeStatus(bike._id, e.target.value)}
                className="w-full text-sm border text-black border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {bike.notes && (
              <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                {bike.notes}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}