import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { travelCardsTable, travelCardsUsersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

// GET /api/travelcards
// Get all travelcards of this user.
export async function GET(req: NextRequest) {
  try {
    // 身份驗證以獲得用戶 ID
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const dbTravelCards = await db.query.travelCardsUsersTable.findMany({
      where: eq(travelCardsUsersTable.userId, userId),
      with: {
        travelCardsTable: {
          columns: {
            displayId: true,
            title: true,
            description: true,
          },
        },
      },
    });

    // 返回查詢結果
    return NextResponse.json(
      {
        body: {
          dbTravelCards,
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

// POST /api/travelcards
// Create a new travelcard.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await auth();

    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // create new travelcard
    const [newTravelCard] = await db
      .insert(travelCardsTable)
      .values({
        title: body.title,
        description: body.description,
      })
      .returning()
      .execute();

    // pusher socket  (I'm not sure if this is correct)
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });

    await pusher.trigger(`private-${session.user.id}`, "travelcard:update", {
      senderId: session.user.id,
    });

    return NextResponse.json(
      {
        travelcard: newTravelCard,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
