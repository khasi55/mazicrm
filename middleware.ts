import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

// 🛡️ IP WHITELIST CONFIGURATION
// Add your Public IP here to allow access to the dashboard.
// Everyone else will be redirected to /checkoutpage.
const ALLOWED_IPS = [
    '127.0.0.1', // Localhost IPv4
    '::1',       // Localhost IPv6
    '192.168.70.84', // User Local IP
    '164.90.158.92', // User Remote IP 1
    '94.207.224.23',  // User Remote IP 2
    '5.192.18.70'    // New IP Added
];
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    try {
        return await updateSession(request)
    } catch (e: unknown) {
        // Return 500 with exact error for debugging Vercel Edge constraints
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        const errorStack = e instanceof Error ? e.stack : 'No stack trace';

        console.error('Middleware crashed:', errorMessage, errorStack);

        return new NextResponse(
            `Middleware invocation failed: ${errorMessage}\nStack: ${errorStack}`,
            { status: 500, headers: { 'content-type': 'text/plain' } }
        );
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
