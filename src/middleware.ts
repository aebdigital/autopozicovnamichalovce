import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login')
    ) {
        // If user is not authenticated and trying to access a protected route
        // (like /admin)
        if (request.nextUrl.pathname.startsWith('/admin')) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // If user is authenticated and trying to access /login, redirect to /admin
    if (user && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Specific check for info@dariusgarage.sk
    // If user is logged in but not info@dariusgarage.sk and trying to access /admin
    // Ideally this should be more role-based, but for now specific email check as requested.
    // We can do this check here or in the layout/page. Middleware is cleaner for route protection.
    if (user && request.nextUrl.pathname.startsWith('/admin') && user.email !== 'info@dariusgarage.sk') {
        // redirect to home or show denied? Probably home for now.
        return NextResponse.redirect(new URL('/', request.url))
    }


    return supabaseResponse
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
