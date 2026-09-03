import mongoose, { Schema, Document } from 'mongoose';
import { connectDB } from '@/lib/mongodb';

export interface IReport extends Document {
  incidentType: string;
  species?: string;
  date?: string;
  time?: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  informantName?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>({
  incidentType: { type: String, required: true },
  species: { type: String },
  date: { type: String },
  time: { type: String },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  phone: { type: String },
  informantName: { type: String },
  isAnonymous: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export async function getReportModel() {
  const mongooseInstance = await connectDB();
  
  // Access the underlying Connection object
  const reportsDb = mongooseInstance.connection.useDb('reports_db', { useCache: true });
  
  return reportsDb.models.Report || reportsDb.model<IReport>('Report', ReportSchema);
}