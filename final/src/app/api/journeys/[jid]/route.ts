import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { journeysTable, travelCardsTable } from "@/db/schema3";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

// DELETE /api/journeys/:jid
// Delete a journey.
export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      jid: string;
    };
  },
) {

  try {
    const journeyId = params.jid;
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [journey] = await db
      .select({
        displayId: journeysTable.displayId,
      })
      .from(journeysTable)
      .where(and(eq(journeysTable.displayId, journeyId)));

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    const result = await db
      .delete(journeysTable)
      .where(and(eq(journeysTable.displayId, journeyId)))
      .execute();

    if (!result) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}



// PUT /api/journeys/:jid
// Update a journey.
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      jid: string;
    };
  },
)
{
  try {
    const journeyId = params.jid;
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [journey] = await db
      .select({
        displayId: journeysTable.displayId,
      })
      .from(journeysTable)
      .where(and(eq(journeysTable.displayId, journeyId)));

    if (!journey) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }
    const setVal = await req.json();
    
    const result = await db
      .update(journeysTable)
      .set(setVal)
      .where(and(eq(journeysTable.displayId, journeyId)))
      .execute();

    if (!result) {
      return NextResponse.json({ error: "Journey not found" }, { status: 404 });
    }

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}