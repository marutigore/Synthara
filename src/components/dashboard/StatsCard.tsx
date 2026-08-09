import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Sparkline } from "@/components/dashboard/Sparkline";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'emerald' | 'purple' | 'orange' | 'red';
  sparklineData?: number[];
}

export function StatsCard({ title, value, icon: Icon, trend, color = 'blue', sparklineData }: StatsCardProps) {
  const colorMap = {
    blue: 'text-blue-500 bg-blue-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    purple: 'text-purple-500 bg-purple-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    red: 'text-red-500 bg-red-500/10',
  };

  const strokeColorMap = {
    blue: '#3b82f6',
    emerald: '#10b981',
    purple: '#a855f7',
    orange: '#f97316',
    red: '#ef4444',
  };

  const numericVal = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
  const isPureNumber = !isNaN(numericVal) && String(value).trim().match(/^[0-9,.%+$]+$/);

  return (
    <Card className="modern-card relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${colorMap[color].split(' ')[1]}`} />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colorMap[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && (
            <div className={`text-sm font-bold flex items-center gap-1 ${trend.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className="flex items-end justify-between space-y-1">
          <div>
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              {title}
            </CardTitle>
            <div className="text-3xl font-black text-foreground tracking-tight">
              {isPureNumber ? (
                <AnimatedCounter value={numericVal} suffix={String(value).includes('%') ? '%' : ''} />
              ) : (
                value
              )}
            </div>
          </div>

          <div className="pl-2 pb-1">
            <Sparkline
              data={sparklineData || (color === 'emerald' ? [15, 22, 18, 30, 25, 38, 42] : [8, 12, 20, 16, 28, 35, 39])}
              color={strokeColorMap[color]}
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
