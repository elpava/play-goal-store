export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/profile'],
}

export { auth as middleware } from '@/auth'
