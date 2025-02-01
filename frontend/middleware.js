import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Retrieve token from cookies
  const token = req.cookies.get('token')?.value; // Use `.value` to get the value of the token
  
  console.log('Token in middleware:', token);

  if (!token) {
    // Redirect to login if no token is found
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Validate the token with your backend API
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // If token validation fails, redirect to login
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    const user = await response.json();
    console.log('User fetched from profile API:', user);

    // Admin-specific redirect
    if (user.role === 'Admin' && !req.nextUrl.pathname.startsWith('/admin')) {
      const adminUrl = req.nextUrl.clone();
      adminUrl.pathname = '/admin';
      return NextResponse.redirect(adminUrl);
    }

    // Non-Admin-specific redirect
    if (user.role !== 'Admin' && req.nextUrl.pathname.startsWith('/admin')) {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = '/';
      return NextResponse.redirect(homeUrl);
    }
      // Non-Admin-specific redirect
      if (req.nextUrl.pathname.startsWith('/checkout')) {
        const homeUrl = req.nextUrl.clone();
        homeUrl.pathname = '/';
        return NextResponse.redirect(homeUrl);
      }
   
  } catch (error) {
    console.error('Error in middleware:', error);
    // Redirect to login on any error
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  matcher: ['/admin/:path*','/checkout:path*', '/dashboard/:path*'], // Apply middleware to specific routes
};
