import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerEmail: String,
  customerPhoto: String, // Cloudinary URL
  emergencyContact: {
    name: String,
    phone: String
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  actualReturnTime: Date,
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike',
    required: true
  },
  rentalType: {
    type: String,
    enum: ['Hourly', 'Daily', 'Weekly'],
    default: 'Hourly'
  },
  basePrice: Number,
  lateFee: {
    type: Number,
    default: 0
  },
  totalAmount: Number,
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Confirmed', 'CheckedIn', 'Active', 'Completed', 'Cancelled'],
    default: 'Confirmed'
  },
  isWalkIn: {
    type: Boolean,
    default: false
  },
  staffNotes: String,
  damageReport: {
    description: String,
    photos: [String], // Cloudinary URLs
    cost: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate booking ID
bookingSchema.pre('save', function(next) {
  if (!this.bookingId) {
    this.bookingId = 'BK' + Date.now();
  }
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);