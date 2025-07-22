import mongoose from 'mongoose';

const bikeSchema = new mongoose.Schema({
  bikeId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Mountain', 'City', 'Electric', 'Road', 'Hybrid']
  },
  size: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL']
  },
  color: String,
  brand: String,
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Maintenance'],
    default: 'Available'
  },
  currentBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null
  },
  image: String, // Cloudinary URL
  notes: String,
  maintenanceHistory: [{
    date: Date,
    description: String,
    cost: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Bike || mongoose.model('Bike', bikeSchema);