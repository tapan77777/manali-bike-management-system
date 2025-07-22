// src/app/api/bikes/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with your actual database
let bikes = [
  {
    _id: 'bike_1',
    bikeId: 'BK001',
    type: 'Mountain Bike',
    size: 'Large',
    color: 'Red',
    status: 'Available',
    image: '/images/mountain-bike.jpg',
    notes: 'Recently serviced'
  },
  {
    _id: 'bike_2',
    bikeId: 'BK002',
    type: 'City Bike',
    size: 'Medium',
    color: 'Blue',
    status: 'Rented',
    image: '/images/city-bike.jpg',
    notes: ''
  },
  {
    _id: 'bike_3',
    bikeId: 'BK003',
    type: 'Electric Bike',
    size: 'Large',
    color: 'Black',
    status: 'Available',
    image: '/images/electric-bike.jpg',
    notes: 'Battery at 100%'
  },
  {
    _id: 'bike_4',
    bikeId: 'BK004',
    type: 'Road Bike',
    size: 'Small',
    color: 'White',
    status: 'Maintenance',
    image: '/images/road-bike.jpg',
    notes: 'Brake adjustment needed'
  }
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const bikeIndex = bikes.findIndex(bike => bike._id === id);
    
    if (bikeIndex === -1) {
      return NextResponse.json(
        { error: 'Bike not found' },
        { status: 404 }
      );
    }
    
    // Update the bike
    bikes[bikeIndex] = { ...bikes[bikeIndex], ...body };
    
    return NextResponse.json(bikes[bikeIndex]);
    
  } catch (error) {
    console.error('Error updating bike:', error);
    return NextResponse.json(
      { error: 'Failed to update bike' },
      { status: 500 }
    );
  }
}