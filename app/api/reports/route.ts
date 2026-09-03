import { NextResponse } from 'next/server';
import { getReportModel } from '@/models/report';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const incidentType = formData.get('incidentType') as string;
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    const description = formData.get('description') as string;
    const species = (formData.get('species') as string) || '';
    const date = (formData.get('date') as string) || '';
    const time = (formData.get('time') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const informantName = (formData.get('informantName') as string) || '';
    const isAnonymous = formData.get('isAnonymous') === 'true';

    // Fetch model configured for 'reports_db'
    const Report = await getReportModel();

    // Save report into the separate database
    const newReport = await Report.create({
      incidentType,
      species,
      date,
      time,
      description,
      location: { lat, lng },
      phone,
      informantName,
      isAnonymous,
    });

    return NextResponse.json({ success: true, reportId: newReport._id }, { status: 201 });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ error: 'Failed to process report' }, { status: 500 });
  }
}