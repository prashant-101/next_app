import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Species from '@/models/Species';
import demoData from '@/data/demo.json';

export async function POST() {
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

    return NextResponse.json({ 
      success: true, 
      message: `Database seeded successfully with ${demoData.length} species` 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Send a POST request to seed the database with demo data' 
  });
}
