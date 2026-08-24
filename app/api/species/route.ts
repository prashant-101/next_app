import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const mongoose = await connectDB();

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("Database connection not available");
    }

    const animals = await db
      .collection("species")
      .find({})
      .toArray();

    return NextResponse.json({
      animals,
    });
  } catch (error) {
    console.error("Species API error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch species",
      },
      {
        status: 500,
      }
    );
  }
}