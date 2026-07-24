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
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);

          if (init?.signal) {
            init.signal.addEventListener('abort', () => controller.abort());
          }

          return fetch(input, {
            ...init,
            signal: controller.signal,
          }).finally(() => {
            clearTimeout(timeoutId);
          });
        }
      },
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
    }
  );
}
