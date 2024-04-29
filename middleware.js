export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export { auth as middleware } from '@/auth'
