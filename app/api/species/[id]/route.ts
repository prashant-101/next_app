import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("Requested species ID:", id);

    await connectDB();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection not available");
    }

    // Build query: match string 'id' OR MongoDB '_id' (if valid ObjectId)
    const queryConditions: any[] = [{ id: id }];

    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Query MongoDB for either field
    const animal = await db.collection("species").findOne({
      $or: queryConditions,
    });

    if (!animal) {
      return NextResponse.json(
        { error: "Species not found" },
        { status: 404 }
      );
    }

    // Return the animal directly (or wrapped consistently)
    return NextResponse.json(animal);
  } catch (error) {
    console.error("Species detail API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch species" },
      { status: 500 }
    );
  }
}