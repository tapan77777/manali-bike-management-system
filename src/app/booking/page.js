
import BookingForm from '../../components/booking/BookingForm';

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Booking
        </h1>
        
        <BookingForm/>
      </div>
    </div>
  );
}