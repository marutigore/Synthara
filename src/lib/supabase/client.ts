import { createBrowserClient } from '@supabase/ssr';

let cachedClient: ReturnType<typeof createBrowserClient> | null = null;

export function createSupabaseBrowserClient() {
  // Only create client on the client side
  if (typeof window === 'undefined') {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const placeholderUrls = ['YOUR_SUPABASE_URL_HERE', 'your_supabase_project_url_here'];
  const placeholderKeys = ['YOUR_SUPABASE_ANON_KEY_HERE', 'your_supabase_anon_key_here'];

  if (
    !supabaseUrl ||
    typeof supabaseUrl !== 'string' ||
    supabaseUrl.trim() === '' ||
    placeholderUrls.includes(supabaseUrl) ||
    !/^https?:\/\/[a-z0-9-]+\.supabase\.co/.test(supabaseUrl)
  ) {
    return null;
  }
  if (
    !supabaseAnonKey ||
    typeof supabaseAnonKey !== 'string' ||
    supabaseAnonKey.trim() === '' ||
    placeholderKeys.includes(supabaseAnonKey)
  ) {
    return null;
  }

  try {
    const client = createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: true,
          detectSessionInUrl: false,
          // Custom lock to prevent "Lock broken by another request with the steal option"
          lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => {
            return await fn();
          },
        },
        global: {
          // Safe fetch wrapper to handle offline mode cleanly
          fetch: async (url: RequestInfo | URL, options?: RequestInit) => {
            try {
              return await fetch(url, options);
            } catch (err: any) {
              const urlStr = typeof url === 'string' ? url : url.toString();

              // For refresh token requests, return a clean invalid_grant so GoTrue clears expired tokens cleanly
              if (urlStr.includes('/auth/v1/token')) {
                return new Response(
                  JSON.stringify({
                    error: 'invalid_grant',
                    error_description: 'Invalid Refresh Token: Offline mode',
                    code: 'invalid_grant',
                  }),
                  {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                  }
                );
              }

              // For other auth requests (like getUser), return null user without throwing
              if (urlStr.includes('/auth/v1')) {
                return new Response(
                  JSON.stringify({
                    user: null,
                    session: null,
                    data: { user: null, session: null },
                  }),
                  {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                  }
                );
              }

              // For table REST queries, return empty list
              return new Response(JSON.stringify([]), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            }
          },
        },
      }
    );
    cachedClient = client;
    return client;
  } catch (e: any) {
    return null;
  }
}
