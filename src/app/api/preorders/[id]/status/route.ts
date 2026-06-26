import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const isExist = await prisma.preOrder.findUnique({
      where: { id },
    });

    if (!isExist) {
      return NextResponse.json(
        {
          success: false,
          message: "PreOrder Is Not Found.",
        },
        {
          status: 404,
        }
      );
    }

    const newStatus =
      isExist.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    const updated = await prisma.preOrder.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: "PreOrder status updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}