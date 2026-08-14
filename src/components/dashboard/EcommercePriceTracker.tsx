'use client';

import React, { useState } from 'react';
import { ShoppingCart, TrendingDown, TrendingUp, AlertCircle, RefreshCw, DollarSign, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrackedProduct {
  id: string;
  productName: string;
  sku: string;
  targetPrice: number;
  competitorPrice: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  discountPct: number;
}

export function EcommercePriceTracker() {
  const [products, setProducts] = useState<TrackedProduct[]>([
    { id: '1', productName: 'Sony WH-1000XM5 Wireless Headphones', sku: 'SNY-WH5-BLK', targetPrice: 399.99, competitorPrice: 348.00, stockStatus: 'In Stock', discountPct: 13.0 },
    { id: '2', productName: 'Apple MacBook Air M3 (15-inch)', sku: 'APL-MBA-M3', targetPrice: 1299.00, competitorPrice: 1199.00, stockStatus: 'In Stock', discountPct: 7.7 },
    { id: '3', productName: 'Samsung Odyssey G9 Gaming Monitor', sku: 'SAM-ODG9-49', targetPrice: 1499.99, competitorPrice: 1199.99, stockStatus: 'Low Stock', discountPct: 20.0 },
    { id: '4', productName: 'Logitech MX Master 3S Mouse', sku: 'LOG-MX3S-GRY', targetPrice: 99.99, competitorPrice: 89.99, stockStatus: 'In Stock', discountPct: 10.0 },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshPrices = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) => {
          const delta = (Math.random() - 0.5) * 15;
          const newCompPrice = Math.max(10, parseFloat((p.competitorPrice + delta).toFixed(2)));
          const discountPct = parseFloat((((p.targetPrice - newCompPrice) / p.targetPrice) * 100).toFixed(1));
          return {
            ...p,
            competitorPrice: newCompPrice,
            discountPct,
          };
        })
      );
      setIsRefreshing(false);
    }, 650);
  };

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-emerald-500/5 border-emerald-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <ShoppingCart className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              E-Commerce Price Intelligence & Competitor Tracker
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated price scraping, competitor MSRP tracking, and stock alert monitoring.
            </p>
          </div>
        </div>

        <Button
          onClick={refreshPrices}
          disabled={isRefreshing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Scraping...' : 'Scrape Prices'}
        </Button>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Product & SKU</th>
              <th className="p-3">MSRP Target</th>
              <th className="p-3">Competitor Price</th>
              <th className="p-3">Price Variance</th>
              <th className="p-3">Stock State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-sans font-bold text-foreground">{p.productName}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{p.sku}</div>
                </td>
                <td className="p-3 font-bold text-muted-foreground">${p.targetPrice.toFixed(2)}</td>
                <td className="p-3 font-bold text-emerald-500">${p.competitorPrice.toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 w-fit ${
                    p.discountPct > 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {p.discountPct > 0 ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
                    {p.discountPct > 0 ? `-${p.discountPct}%` : `+${Math.abs(p.discountPct)}%`}
                  </span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase bg-muted text-muted-foreground border border-border/40">
                    {p.stockStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-500 font-semibold">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4" /> 4 Competitor Endpoints Monitored • Live Scraping Operational
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Avg Discount: 12.7%</span>
      </div>
    </div>
  );
}
