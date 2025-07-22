import dbConnect from '@/lib/mongodb';
import Bike from '@/models/Bike';

export async function PATCH(request, context) {
  try {
    await dbConnect();

    const { id } = context.params; // extract ID properly
    const updates = await request.json();

    const bike = await Bike.findByIdAndUpdate(id, updates, { new: true });

    return Response.json(bike);
  } catch (error) {
    return Response.json({ error: 'Failed to update bike' }, { status: 500 });
  }
}
