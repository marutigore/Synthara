'use client';

import React, { useState } from 'react';
import { Home, TrendingUp, TrendingDown, MapPin, DollarSign, RefreshCw, CheckCircle2, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertyListing {
  id: string;
  address: string;
  city: string;
  listPrice: number;
  pricePerSqFt: number;
  rentalYield: number;
  bedrooms: number;
  sqFt: number;
  daysOnMarket: number;
  trend: 'Appreciating' | 'Stable' | 'Declining';
}

export function RealEstateMarketScraper() {
  const [listings, setListings] = useState<PropertyListing[]>([
    { id: '1', address: '1420 Market Street', city: 'San Francisco, CA', listPrice: 1250000, pricePerSqFt: 892, rentalYield: 4.2, bedrooms: 3, sqFt: 1400, daysOnMarket: 12, trend: 'Appreciating' },
    { id: '2', address: '88 Whitfield Lane', city: 'Austin, TX', listPrice: 485000, pricePerSqFt: 310, rentalYield: 5.8, bedrooms: 4, sqFt: 1565, daysOnMarket: 28, trend: 'Stable' },
    { id: '3', address: '2200 Lake Shore Blvd', city: 'Chicago, IL', listPrice: 375000, pricePerSqFt: 245, rentalYield: 6.4, bedrooms: 2, sqFt: 1530, daysOnMarket: 45, trend: 'Declining' },
    { id: '4', address: '560 Brickell Key Dr', city: 'Miami, FL', listPrice: 890000, pricePerSqFt: 620, rentalYield: 4.9, bedrooms: 3, sqFt: 1435, daysOnMarket: 8, trend: 'Appreciating' },
  ]);

  const [isScraping, setIsScraping] = useState(false);

  const scrapeListings = () => {
    setIsScraping(true);
    setTimeout(() => {
      setListings((prev) =>
        prev.map((l) => ({
          ...l,
          listPrice: l.listPrice + Math.floor((Math.random() - 0.4) * 15000),
          pricePerSqFt: l.pricePerSqFt + Math.floor((Math.random() - 0.4) * 20),
          daysOnMarket: Math.max(1, l.daysOnMarket + Math.floor((Math.random() - 0.5) * 5)),
        }))
      );
      setIsScraping(false);
    }, 700);
  };

  const avgYield = (listings.reduce((sum, l) => sum + l.rentalYield, 0) / listings.length).toFixed(1);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-teal-500/5 border-teal-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-500 border border-teal-500/20">
            <Building className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Real Estate & Property Market Intelligence Scraper
            </h4>
            <p className="text-xs text-muted-foreground">
              Tracks listing prices, rental yields, $/sqft, and neighborhood market trends across metro areas.
            </p>
          </div>
        </div>

        <Button
          onClick={scrapeListings}
          disabled={isScraping}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isScraping ? 'animate-spin' : ''}`} />
          {isScraping ? 'Scraping MLS...' : 'Scrape Market Listings'}
        </Button>
      </div>

      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Property Address</th>
              <th className="p-3">List Price</th>
              <th className="p-3">$/SqFt</th>
              <th className="p-3">Rental Yield</th>
              <th className="p-3">Days on Market</th>
              <th className="p-3">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {listings.map((l) => (
              <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-sans font-bold text-foreground">{l.address}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="size-3" />{l.city} • {l.bedrooms}BR / {l.sqFt.toLocaleString()} sqft</div>
                </td>
                <td className="p-3 font-bold text-foreground">${l.listPrice.toLocaleString()}</td>
                <td className="p-3 font-bold text-teal-500">${l.pricePerSqFt}</td>
                <td className="p-3 font-bold text-emerald-500">{l.rentalYield}%</td>
                <td className="p-3 text-muted-foreground">{l.daysOnMarket}d</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 w-fit ${
                    l.trend === 'Appreciating' ? 'bg-emerald-500/20 text-emerald-500' :
                    l.trend === 'Declining' ? 'bg-red-500/20 text-red-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {l.trend === 'Appreciating' ? <TrendingUp className="size-3" /> : l.trend === 'Declining' ? <TrendingDown className="size-3" /> : null}
                    {l.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between text-xs text-teal-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> 4 Metro Markets Tracked • Avg Rental Yield: {avgYield}%
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Mortgage Rate: 6.45% APR</span>
      </div>
    </div>
  );
}
