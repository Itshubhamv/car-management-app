import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ cars: [] }, { status: 200 });
  }

  try {
    const cars = await prisma.cars.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
      },
      take: 10,
    });

    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    console.error("Error searching cars:", error);
    return NextResponse.json({ cars: [], error: "Failed to fetch data" }, { status: 500 });
  }
}
