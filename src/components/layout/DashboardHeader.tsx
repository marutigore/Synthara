
"use client";

import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Search, Settings, User, LifeBuoy, Menu, LogOut, LogIn } from 'lucide-react';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { SyntharaLogo } from '../icons/SyntharaLogo';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';

import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import { Breadcrumbs } from './Breadcrumbs';

export function DashboardHeader() {
  const { isMobile } = useSidebar();
  const [hasMounted, setHasMounted] = React.useState(false);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  React.useEffect(() => {
    setHasMounted(true);
    if (!supabase) return;
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await supabase.auth.getUser();
        if (isMounted && res?.data?.user) {
          setUser(res.data.user);
          return;
        }
      } catch (err) {
        // Silently ignore offline network error in dev
      }

      if (isMounted && typeof window !== 'undefined') {
        const localEmail = localStorage.getItem('synthara_user_email');
        const localName = localStorage.getItem('synthara_user_name');
        if (localEmail) {
          setUser({
            id: 'dev-user',
            email: localEmail,
            user_metadata: { full_name: localName || localEmail.split('@')[0] },
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as any);
        }
      }
    };
    fetchUser();

    try {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        isMounted = false;
        authListener?.subscription?.unsubscribe();
      };
    } catch (err) {
      return () => {
        isMounted = false;
      };
    }
  }, [supabase, router]);

  const handleSignOut = async () => {
    document.cookie = "synthara_dev_session=; path=/; max-age=0;";
    if (typeof window !== 'undefined') {
      localStorage.removeItem('synthara_user_email');
      localStorage.removeItem('synthara_user_name');
    }
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        // ignore
      }
    }
    window.location.href = '/auth';
  };

  const commonRightContent = (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="hidden lg:flex items-center gap-1 group">
        <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500/80">System Online</span>
      </div>

      <div className="h-4 w-px bg-border/40 mx-2 hidden sm:block" />

      <ThemeToggle />

      <NotificationCenter />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted h-10 w-10 border border-transparent hover:border-border/50 transition-all">
            <Avatar className="h-8 w-8 rounded-lg border">
              <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.email || "User Avatar"} />
              <AvatarFallback className="text-xs bg-muted text-foreground font-bold">{user?.email ? user.email.charAt(0).toUpperCase() : "U"}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60 shadow-2xl rounded-2xl p-2 border-border/50 backdrop-blur-xl">
          {user ? (
            <>
              <DropdownMenuLabel className="p-3">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-bold leading-none text-foreground">{user.user_metadata?.full_name || user.email}</p>
                  <p className="text-[10px] leading-none text-muted-foreground font-medium mt-1">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/40 my-1" />
              <DropdownMenuItem className="rounded-xl py-2 font-bold cursor-pointer" asChild>
                <Link href="/dashboard/profile"><User className="mr-2.5 h-4 w-4" />Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-2 font-bold cursor-pointer" asChild>
                <Link href="/dashboard/settings"><Settings className="mr-2.5 h-4 w-4" />Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-2 font-bold cursor-pointer" asChild>
                <Link href="/help"><LifeBuoy className="mr-2.5 h-4 w-4" />Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/40 my-1" />
              <DropdownMenuItem className="rounded-xl py-2 font-bold text-destructive focus:text-destructive cursor-pointer" onClick={handleSignOut}>
                <LogOut className="mr-2.5 h-4 w-4" />Terminate Session
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild>
              <Link href="/auth"><LogIn className="mr-2.5 h-4 w-4" />Sign In</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  if (!hasMounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b bg-background/50 backdrop-blur-xl px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-muted animate-pulse" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-muted animate-pulse" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border/40 bg-background/50 backdrop-blur-xl px-4 sm:px-6">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <SidebarTrigger className="h-10 w-10 hover:bg-muted rounded-xl border border-transparent hover:border-border/50 transition-all flex-shrink-0" />
        <div className="h-5 w-px bg-border/40 mx-2 hidden md:block" />
        <div className="hidden sm:block flex-shrink-0">
          <Breadcrumbs />
        </div>
      </div>

      {commonRightContent}
    </header>
  );
}
