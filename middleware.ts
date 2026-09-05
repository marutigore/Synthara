import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;
  const isDevSession = request.cookies.get('synthara_dev_session')?.value === 'true';

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('YOUR_SUPABASE') && !supabaseAnonKey.includes('YOUR_SUPABASE')) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({ name, value, ...options })
              response = NextResponse.next({ request: { headers: request.headers } })
              response.cookies.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({ name, value: '', ...options })
              response = NextResponse.next({ request: { headers: request.headers } })
              response.cookies.set({ name, value: '', ...options })
            },
          },
        }
      )

      async function withTimeout<T>(p: Promise<T>, ms: number, fallback: T): Promise<T> {
        let timeout: any;
        const timeoutPromise = new Promise<T>((resolve) => {
          timeout = setTimeout(() => resolve(fallback), ms);
        });
        p.catch(() => null);
        return Promise.race([p, timeoutPromise]).finally(() => clearTimeout(timeout)) as Promise<T>;
      }

      const { data } = await withTimeout<any>(
        supabase.auth.getUser(),
        1000,
        { data: { user: null } }
      );
      user = data?.user ?? null;
    } catch (err) {
      user = null;
    }
  }

  const { pathname } = request.nextUrl

  // Protected routes: /dashboard and its children
  if (pathname.startsWith('/dashboard')) {
    if (!user && !isDevSession) {
      const url = new URL('/auth', request.url)
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
  }

  // If user is logged in (cloud or dev session) and tries to access /auth, redirect to dashboard
  if ((user || isDevSession) && pathname.startsWith('/auth') && pathname !== '/auth/callback' && pathname !== '/auth/auth-code-error') {
    const url = new URL('/dashboard', request.url)
    url.searchParams.delete('next')
    return NextResponse.redirect(url)
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth',
  ],
}
