import dbConnect from '@/lib/mongodb';
import Bike from '@/models/Bike';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await dbConnect();
    const bookings = await Booking.find({})
      .populate('bikeId')
      .sort({ createdAt: -1 });
    return Response.json(bookings);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const bookingData = await request.json();
    
    // Create booking
    const booking = await Booking.create(bookingData);
    
    // Update bike status
    await Bike.findByIdAndUpdate(bookingData.bikeId, {
      status: 'Rented',
      currentBooking: booking._id
    });
    
    return Response.json(booking);
  } catch (error) {
    return Response.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}