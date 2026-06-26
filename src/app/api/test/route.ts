import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const preorders = await prisma.preOrder.findMany();

  return NextResponse.json({
    success: true,
    data: preorders,
  });
}