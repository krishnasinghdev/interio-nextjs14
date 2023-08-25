import { getShotById } from '@/lib/actions/shot.actions'
import { NextResponse,NextRequest } from 'next/server'
 
export async function GET(request:NextRequest,{params}:{params:{shotId:string}} ) {
try {

  const shotId = params.shotId
  const shot = await getShotById(shotId)
  if(!shot) return NextResponse.json({ shot:{} })
 
  return NextResponse.json(shot)
} catch (error) {
  return NextResponse.json({ error})
}
}