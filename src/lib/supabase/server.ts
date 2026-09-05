import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon || typeof url !== 'string' || typeof anon !== 'string' || url.trim() === '' || anon.trim() === '' || !/^https?:\/\//.test(url)) {
    return null;
  }

  return createServerClient(
    url,
    anon,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
          }
        },
      },
      global: {
        fetch: async (url: RequestInfo | URL, options?: RequestInit) => {
          try {
            return await fetch(url, options);
          } catch (err: any) {
            const urlStr = typeof url === 'string' ? url : url.toString();
            const isAuthUrl = urlStr.includes('/auth/v1');

            const fallbackBody = isAuthUrl
              ? { user: null, session: null, access_token: null, data: null }
              : [];

            return new Response(JSON.stringify(fallbackBody), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        },
      },
    }
  );
}
