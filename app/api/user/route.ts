import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // const feedbacks = await fetch("https://evenbeam.com")

  const json_response = {
    status: "success",
    feedbacks: [{ name: "John Doe", feedback: "This is a feedback" }],
  }
  return NextResponse.json(json_response)
}
// create a post request that console logs the body
export async function POST(request: NextRequest) {
  // const body = await.json();
  console.log(request.body)
  // return NextResponse.json(body);
}
// create a put request that console logs the body
