
import { DashboardShell } from './_components/DashboardShell';
import { NavigationLoadingProvider } from '@/components/providers/navigation-loading-provider';
import { OnboardingTour } from '@/components/ui/OnboardingTour';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavigationLoadingProvider>
        <OnboardingTour />
        <DashboardShell>
          {children}
        </DashboardShell>
      </NavigationLoadingProvider>
    </div>
  );
}

