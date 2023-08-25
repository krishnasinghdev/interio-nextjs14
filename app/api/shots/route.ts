import { NextRequest, NextResponse } from "next/server"

import { addShot } from "@/lib/actions/shot.actions"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body || typeof body !== "object") {
      return NextResponse.error()
    }

    const shot = await addShot(body)
    if (!shot) {
      return NextResponse.error()
    }

    return NextResponse.json(shot)
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
