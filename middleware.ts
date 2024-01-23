import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const dashboardRoutes = '/dashboard';

export default function authMiddleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("token");

  if (!isAuthenticated && req.nextUrl.pathname.startsWith(dashboardRoutes)) {
    const absoluteURL = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
