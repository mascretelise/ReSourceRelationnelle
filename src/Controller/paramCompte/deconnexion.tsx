
import { NextResponse, type NextRequest } from 'next/server'

export function Deconnexion(request:NextRequest){
    const cookie = request.cookies.get("token")?.value;
    if(cookie){
        request.cookies.delete("token")
        return NextResponse.redirect(new URL('/', request.url))
    }
}