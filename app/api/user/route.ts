import { NextRequest, NextResponse } from "next/server"

import { getAllVendors } from "@/lib/actions/vendor.actions"

export async function GET() {
  // const feedbacks = await fetch("https://evenbeam.com")

  const result = await getAllVendors()
  return NextResponse.json(result)
}
// create a post request that console logs the body
export async function POST(request: NextRequest) {
  // const body = await.json();
  console.log(request.body)
  // return NextResponse.json(body);
}
// create a put request that console logs the body
