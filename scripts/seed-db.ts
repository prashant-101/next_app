import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import Species from '@/models/Species';
import demoData from '@/data/demo.json';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    console.log('Clearing existing species data...');
    await Species.deleteMany({});
    console.log('Cleared existing data');

    // Insert demo data
    console.log('Inserting demo data...');
    await Species.insertMany(demoData);
    console.log(`Inserted ${demoData.length} species into demodb`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
