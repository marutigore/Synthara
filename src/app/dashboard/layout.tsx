
import { DashboardShell } from './_components/DashboardShell';
import { NavigationLoadingProvider } from '@/components/providers/navigation-loading-provider';
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider';
import { OnboardingTour } from '@/components/ui/OnboardingTour';
import { CommandPalette } from '@/components/ui/CommandPalette';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavigationLoadingProvider>
        <OnboardingTour />
        <CommandPalette />
        <DashboardShell>
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </DashboardShell>
      </NavigationLoadingProvider>
    </div>
  );
}

