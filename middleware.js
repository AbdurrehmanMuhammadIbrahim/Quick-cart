import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('token')?.value; // Retrieve token
  console.log('Token in middleware:', token);

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Validate the token with backend API
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    const user = await response.json();
    console.log('User fetched from profile API:', user);

    const isAdmin = user.role === 'Admin';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isCheckoutRoute = req.nextUrl.pathname.startsWith('/checkout');

    // ✅ Admin can access both /admin and /checkout
    if (isAdmin) {
      if (isAdminRoute || isCheckoutRoute) {
        return NextResponse.next();
      }
    }

    //  Regular user can only access /checkout
    if (!isAdmin && isCheckoutRoute) {
      return NextResponse.next();
    }

    //  Non-admin trying to access /admin
    if (!isAdmin && isAdminRoute) {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = '/';
      return NextResponse.redirect(homeUrl);
    }

  } catch (error) {
    console.error('Error in middleware:', error);
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/dashboard/:path*'], // Apply middleware to specific routes
};
