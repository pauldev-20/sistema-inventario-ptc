import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/categories', '/products']
const publicRoutes = ['/']

export default async function middleware (req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const cookie = cookies().get('session')?.value
  const session = cookie ? JSON.parse(cookie) : null
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/products', req.nextUrl))
  }

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)'
  ]
}
