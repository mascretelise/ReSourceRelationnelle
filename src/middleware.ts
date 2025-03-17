import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("user")?.value;
  const isLogged = cookie && cookie !== "false" && cookie!= null && cookie!= undefined
  if(!isLogged){
    return NextResponse.redirect(new URL('/inscriptionView', request.url))
  }
  return NextResponse.redirect(new URL('/compte', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/compte/:path*'],
}