import dbConnect from '@/lib/mongodb';
import Bike from '@/models/Bike';

export async function GET() {
  try {
    await dbConnect();
    const bikes = await Bike.find({}).populate('currentBooking');
    return Response.json(bikes);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch bikes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const bike = await Bike.create(data);
    return Response.json(bike);
  } catch (error) {
    return Response.json({ error: 'Failed to create bike' }, { status: 500 });
  }
}