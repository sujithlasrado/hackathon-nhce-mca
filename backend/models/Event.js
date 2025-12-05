import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  isMagicEvent: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
