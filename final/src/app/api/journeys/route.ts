import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { journeysTable, travelCardsTable } from "@/db/schema3";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

// POST /api/journeys
// Create a new journey.
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { travelCardsId, title, note, location, date, time1, time2 } =
      await req.json();

    // create journey
    const [res] = await db
      .insert(journeysTable)
      .values({
        title: title,
        note: note,
        location: location,
        date: date,
        time1: time1,
        time2: time2,
        travelCardsId: travelCardsId,
      })
      .returning()
      .execute();

    // pusher
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });

    await pusher.trigger(`private-${userId}`, "journey:update", {
      senderId: userId,
    });

    return NextResponse.json(
      {
        message: res,
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

// PUT /api/journeys/
