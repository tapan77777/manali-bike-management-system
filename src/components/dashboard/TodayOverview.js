/* eslint-disable react/no-unescaped-entities */

'use client';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';

export default function TodayOverview() {
  const [stats, setStats] = useState({
    todayBookings: 0,
    availableBikes: 0,
    rentedBikes: 0,
    overdueBikes: 0,
    todayRevenue: 0
  });

  useEffect(() => {
    fetchTodayStats();
  }, []);

  const fetchTodayStats = async () => {
    try {
      const [bikesRes, bookingsRes] = await Promise.all([
        fetch('/api/bikes'),
        fetch('/api/bookings')
      ]);

      const bikes = await bikesRes.json();
      const bookings = await bookingsRes.json();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayBookings = bookings.filter(
        booking => new Date(booking.createdAt) >= today
      );

      const availableBikes = bikes.filter(bike => bike.status === 'Available').length;
      const rentedBikes = bikes.filter(bike => bike.status === 'Rented').length;

      const now = new Date();
      const overdueBikes = bookings.filter(
        booking =>
          booking.status === 'Active' && new Date(booking.endTime) < now
      ).length;

      const todayRevenue = todayBookings.reduce(
        (sum, booking) => sum + (booking.totalAmount || 0),
        0
      );

      setStats({
        todayBookings: todayBookings.length,
        availableBikes,
        rentedBikes,
        overdueBikes,
        todayRevenue
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Today&apos;s Bookings
        </h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats.todayBookings}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Available Bikes
        </h3>
        <p className="text-3xl font-bold text-green-600">
          {stats.availableBikes}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Rented Bikes
        </h3>
        <p className="text-3xl font-bold text-yellow-600">
          {stats.rentedBikes}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Overdue
        </h3>
        <p className="text-3xl font-bold text-red-600">
          {stats.overdueBikes}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <h3 className="text-sm font-medium text-gray-600 mb-2">
          Today&apos;s Revenue
        </h3>
        <p className="text-3xl font-bold text-purple-600">
          {formatCurrency(stats.todayRevenue) || '₹0'}
        </p>
      </div>
    </div>
  );
}
