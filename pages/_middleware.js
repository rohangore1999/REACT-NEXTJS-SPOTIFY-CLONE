import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    // console.log("REQ >> ", req)

    // the token will exist if the user is logged in
    // passing to getToken the req, and secret
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    // we are catching the url and getting the url
    const { pathname } = req.nextUrl
    // console.log("pathname >> ", pathname)

    // allow the requests if the following is true...
    // 1) '/api/auth' >> its a requests for next-auth session & provider fetching.
    // 2) token >> if the token exist.

    if (pathname.includes('/api/auth') || token) {
        // if your pathname have '/api/auth' or the token(which available only if user loggedin)
        return NextResponse.next() //continue .. let them go
    }

    // redirect them to login if they dont have token AND are requesting a protected route
    if (!token && pathname !== '/login') {
        // if we have no token and pathname is not login >> mean user is trying to access home page so redirect it to login screen
        return NextResponse.redirect('/login')
    }

}