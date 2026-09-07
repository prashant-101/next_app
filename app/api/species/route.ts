import { NextResponse } from "next/server";
import { getAllSpecies } from "@/lib/species-source";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const animals = await getAllSpecies();

    return NextResponse.json({
      animals,
      species: animals,
      data: animals,
    });
  } catch (error) {
    console.error("Species API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch species" },
      { status: 500 }
    );
  }
}
