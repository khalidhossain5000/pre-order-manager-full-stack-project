import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "../../../../generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const filter = searchParams.get("filter");

    const whereCondition: Prisma.PreOrderWhereInput = {};

    if (filter === "Active") {
      whereCondition.status = "ACTIVE";
    } else if (filter === "Inactive") {
      whereCondition.status = "INACTIVE";
    }

    const data = await prisma.preOrder.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.preOrder.count({
      where: whereCondition,
    });

    return NextResponse.json({
      success: true,
      message: "Data Retrieved Successfully",
      data: {
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        data,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
              error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      },
    );
  }
}




//create pre order


export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const result = await prisma.preOrder.create({
      data: {
        name: payload.name,
        products: payload.products,
        preOrderWhen: payload.preorderWhen,
        startsAt: new Date(payload.startsAt),
        endsAt: payload.endsAt ? new Date(payload.endsAt) : null,
        status: payload.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Pre Order Created Successfully",
        data: result,
      },
      {
        status: 201,
      }
    );
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