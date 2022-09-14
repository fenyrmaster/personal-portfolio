import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export function middleware(request = NextRequest){
    return console.log(`From middleware :D, ${request.url}`);
}

export const config = {
    matcher: "/admin/:path*",
}