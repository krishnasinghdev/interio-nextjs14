import { NextResponse } from "next/server"

import { getVendorProfile, updateVendor } from "@/lib/actions/vendor.actions"
import { IVendor } from "@/lib/model/types/vendor-type"

export async function GET() {
  const { vendor, error } = await getVendorProfile()
  if (error) {
    return NextResponse.error()
  }
  return NextResponse.json(vendor)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { vendor, error } = (await updateVendor(body)) as { vendor: IVendor; error?: undefined }
  if (error) {
    return NextResponse.error()
  }
  return NextResponse.json(vendor)
}
