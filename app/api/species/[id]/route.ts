import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// Force dynamic execution to bypass Vercel static build caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Resolve params explicitly
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Invalid request: Missing species ID" },
        { status: 400 }
      );
    }

    // 2. Establish database connection with explicit error handling
    await connectDB();

    const db = mongoose.connection.db;
    if (!db) {
      console.error("Database connection failed: mongoose.connection.db is undefined");
      return NextResponse.json(
        { error: "Database connection unavailable" },
        { status: 503 }
      );
    }

    // 3. Construct $or conditions safely
    const queryConditions: Record<string, unknown>[] = [{ id }];

    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    // 4. Query collection with lean execution
    const animal = await db.collection("species").findOne({
      $or: queryConditions,
    });

    if (!animal) {
      return NextResponse.json(
        { error: "Species not found" },
        { status: 404 }
      );
    }

    // 5. Convert MongoDB BSON ObjectId to plain string to prevent hydration errors on the frontend
    const serializedAnimal = {
      ...animal,
      _id: animal._id.toString(),
    };

    // 6. Return response with strict anti-caching headers
    return NextResponse.json(serializedAnimal, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (error) {
    console.error("Species detail API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch species details" },
      { status: 500 }
    );
  }
}