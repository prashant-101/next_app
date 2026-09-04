import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("SPECIES DETAIL ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "Missing species ID" },
        { status: 400 }
      );
    }

    const mongoose = await connectDB();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("MongoDB database is unavailable");
    }

    // Your database uses the custom "id" field:
    // "id": "himalayan-salamander"
    const animal = await db.collection("species").findOne({
      id: id,
    });

    if (!animal) {
      return NextResponse.json(
        {
          error: "Species not found",
          id,
        },
        { status: 404 }
      );
    }

    const serializedAnimal = {
      ...animal,
      _id: animal._id.toString(),
    };

    return NextResponse.json(serializedAnimal, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("========== SPECIES DETAIL ERROR ==========");
    console.error(error);
    console.error("==========================================");

    return NextResponse.json(
      {
        error: "Failed to fetch species details",
        message:
          error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}