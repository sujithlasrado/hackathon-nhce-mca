import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  qrCodeData: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
