import express from 'express';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

const router = express.Router();

// GET /api/events - Fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// POST /api/seed - Seed database with sample events
router.post('/seed', async (req, res) => {
  try {
    // Clear existing events
    await Event.deleteMany({});

    const sampleEvents = [
      {
        title: 'Neon Hackathon',
        college: 'NIT Surathkal',
        date: new Date('2025-10-26T10:00:00'),
        description: 'A 24-hour coding marathon where teams build innovative solutions. Compete for prizes and glory in this ultimate tech showdown!',
        seats: 100,
        isMagicEvent: true,
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
      },
      {
        title: 'RoboWars',
        college: 'BMSCE',
        date: new Date('2025-11-15T14:00:00'),
        description: 'Battle robots in an epic arena showdown. Design, build, and fight your way to victory in this mechanical combat tournament!',
        seats: 50,
        isMagicEvent: false,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800'
      },
      {
        title: 'Laser Show',
        college: 'RVCE',
        date: new Date('2025-12-20T19:00:00'),
        description: 'Experience a spectacular visual extravaganza with cutting-edge laser technology, music, and stunning light effects.',
        seats: 200,
        isMagicEvent: true,
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'
      },
      {
        title: 'Battle of Bands',
        college: 'BMSCE',
        date: new Date('2025-10-27T18:00:00'),
        description: 'Ultimate music showdown featuring the best college bands competing for glory. Rock out to amazing performances!',
        seats: 150,
        isMagicEvent: false,
        image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'
      }
    ];

    const events = await Event.insertMany(sampleEvents);
    res.json({ message: 'Database seeded successfully', events });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});

// POST /api/register - Register for an event
router.post('/register', async (req, res) => {
  try {
    const { eventId, studentName } = req.body;

    if (!eventId || !studentName) {
      return res.status(400).json({ message: 'Event ID and student name are required' });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if seats are available
    if (event.seats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Generate QR code data (simple string for now)
    const qrCodeData = `INTERFEST-${eventId}-${studentName}-${Date.now()}`;

    // Create registration
    const registration = new Registration({
      studentName,
      eventId,
      qrCodeData
    });

    await registration.save();

    // Decrement seats
    event.seats -= 1;
    await event.save();

    res.json({
      message: 'Registration successful',
      studentName,
      qrCodeData,
      eventId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error: error.message });
  }
});

// GET /api/registrations - Fetch all registrations
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('eventId')
      .sort({ timestamp: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error: error.message });
  }
});

export default router;
