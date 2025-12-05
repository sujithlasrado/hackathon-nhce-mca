import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interfest';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', eventRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'InterFest Hub API is running',
    endpoints: {
      events: 'GET /api/events',
      seed: 'POST /api/seed',
      register: 'POST /api/register',
      registrations: 'GET /api/registrations'
    }
  });
});

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 MongoDB: ${MONGODB_URI}`);
      console.log(`\n🎯 Quick Start:`);
      console.log(`   1. Seed database: POST http://localhost:${PORT}/api/seed`);
      console.log(`   2. View events: GET http://localhost:${PORT}/api/events`);
      console.log(`   3. Register: POST http://localhost:${PORT}/api/register`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n💡 Make sure MongoDB is running on your system:');
    console.log('   Windows: Run "mongod" in a separate terminal');
    console.log('   Mac/Linux: Run "sudo systemctl start mongod"');
    process.exit(1);
  });

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

export default app;
