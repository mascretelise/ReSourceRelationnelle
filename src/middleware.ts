import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {

  try {
    const cookie = request.cookies.get("token")?.value;
    const isLogged = cookie && cookie !== "false" && cookie!= null && cookie!= undefined

   if(!isLogged){
      return NextResponse.redirect(new URL('/connexionView', request.url))
   }
 
  } catch (error) {
    console.log(error)
  }

}
 
export const config = {
  matcher: ['/compte/:path*'],
}