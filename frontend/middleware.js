import { NextResponse } from 'next/server';

// Sets a lightweight geo hint cookie (not a redirect) so the client can
// silently default the existing India/International toggle to the visitor's
// likely region on first visit, without ever hiding or gating any URL from
// crawlers — every page stays reachable and identical regardless of origin.
export function middleware(request) {
  const response = NextResponse.next();

  if (!request.cookies.has('shanker_geo_hint')) {
    const country = request.headers.get('x-vercel-ip-country') || '';
    const hint = country === 'IN' ? 'india' : 'international';
    response.cookies.set('shanker_geo_hint', hint, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
