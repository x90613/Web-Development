import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { plansTable, journeysTable } from "@/db/schema";
import { auth } from "@/lib/auth";

// DELETE /api/travelcards/:pid
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      tid: string;
    };
  },
) {
  try {
    // 身份驗證
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 執行刪除操作
    const result = await db
      .delete(plansTable)
      .where(eq(plansTable.displayId, params.tid))
      .execute();

    // 檢查是否有記錄被刪除
    if (!result) {
      return NextResponse.json(
        { error: "Travelcard not found" },
        { status: 404 },
      );
    }

    // 刪除成功
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// GET /api/travelcards/:tid
// Get all journeys of this travelCard.
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      pid: string;
    };
  },
) {
  try {
    // 身份驗證以獲得用戶 ID
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbJourneys = await db.query.journeysTable.findMany({
      where: eq(journeysTable.plansId, params.pid),
      with: {
        
      },
    });

    // 返回查詢結果
    return NextResponse.json(
      {
        body: {
          dbJourneys,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
