'use client';
import { useEffect, useState } from 'react';

export default function BookingForm() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [bikeId, setBikeId] = useState('');
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch('/api/bikes');
        const data = await res.json();
        // Only show bikes that are available (not rented)
        const availableBikes = data.filter(bike => bike.status !== 'Rented');
        setBikes(availableBikes);
      } catch (err) {
        console.error('Failed to load bikes', err);
      }
    };

    fetchBikes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, phone, bikeId }),
      });

      if (res.ok) {
        setMessage('Booking successful!');
        setCustomerName('');
        setPhone('');
        setBikeId('');
      } else {
        const errData = await res.json();
        setMessage(`Error: ${errData.error}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded text-black">
      <h2 className="text-xl font-bold mb-4">New Booking</h2>

      <div className="mb-4">
        <label className="block mb-1">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select Bike</label>
        <select
          value={bikeId}
          onChange={(e) => setBikeId(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Choose a bike --</option>
          {bikes.map((bike) => (
            <option key={bike._id} value={bike._id}>
              {bike.name || bike.model || bike.type || 'Unnamed Bike'}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? 'Booking...' : 'Book Now'}
      </button>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </form>
  );
}
