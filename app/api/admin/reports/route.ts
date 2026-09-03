import { NextResponse } from 'next/server';
import { getReportModel } from '@/models/report';

export async function GET() {
  try {
    const Report = await getReportModel();
    const reports = await Report.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}