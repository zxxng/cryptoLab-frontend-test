import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PATH } from './constants/appNavigation'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL(PATH.root, request.url))
}

export const config = {
  matcher: '/',
}
