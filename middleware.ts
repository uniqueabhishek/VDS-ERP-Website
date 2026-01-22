// DEVELOPMENT ONLY: Authentication disabled
// This middleware allows all requests to pass through without authentication

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simply allow all requests to pass through
  return NextResponse.next()
}

export const config = {
  matcher: ['/accountant/:path*', '/dashboard/:path*'],
}

/*
// To re-enable authentication, replace the above with:

import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: ['/accountant/:path*', '/dashboard/:path*'],
}
*/
