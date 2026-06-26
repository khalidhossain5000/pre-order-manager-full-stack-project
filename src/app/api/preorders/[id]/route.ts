import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await prisma.preOrder.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data Retrieved Successfully",
      data: result,
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
      },
    );
  }
}




//update order

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = await req.json();

    const result = await prisma.preOrder.update({
      where: { id },
      data: {
        ...payload,

        startsAt: payload.startsAt
          ? new Date(payload.startsAt)
          : undefined,

        endsAt:
          payload.endsAt === null
            ? null
            : payload.endsAt
              ? new Date(payload.endsAt)
              : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "PreOrder updated successfully",
      data: result,
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




//delete


export async function DELETE(
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
          message: "PreOrder not found",
        },
        {
          status: 404,
        }
      );
    }

    const deleted = await prisma.preOrder.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "PreOrder deleted successfully",
      data: deleted,
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