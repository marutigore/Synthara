'use client';

import React, { useState } from 'react';
import { Database, Cloud, CheckCircle2, ArrowUpRight, RefreshCw, Server, HardDrive, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LakehouseTarget {
  id: string;
  platform: 'Snowflake (Iceberg)' | 'Databricks (Delta Lake)' | 'Google BigQuery' | 'AWS S3 (Parquet)';
  databaseName: string;
  tableName: string;
  partitionKey: string;
  syncedRows: number;
  lastSyncTime: string;
  syncStatus: 'Synced' | 'Syncing' | 'Pending';
}

export function DataLakehouseSync() {
  const [targets, setTargets] = useState<LakehouseTarget[]>([
    { id: '1', platform: 'Snowflake (Iceberg)', databaseName: 'SYNTHARA_PROD_DB', tableName: 'SYNTHETIC_TRANSACTIONS', partitionKey: 'created_date=YYYY-MM-DD', syncedRows: 125000, lastSyncTime: '5 mins ago', syncStatus: 'Synced' },
    { id: '2', platform: 'Databricks (Delta Lake)', databaseName: 'lakehouse_silver', tableName: 'customer_churn_telemetry', partitionKey: 'region=us-east-1', syncedRows: 84000, lastSyncTime: '12 mins ago', syncStatus: 'Synced' },
    { id: '3', platform: 'Google BigQuery', databaseName: 'synthara-bi-analytics', tableName: 'real_estate_listings_v1', partitionKey: 'metro_area=BAY_AREA', syncedRows: 42000, lastSyncTime: '30 mins ago', syncStatus: 'Synced' },
    { id: '4', platform: 'AWS S3 (Parquet)', databaseName: 's3://synthara-data-lake', tableName: 'raw_scraped_dom_nodes', partitionKey: 'year=2026/month=08', syncedRows: 310000, lastSyncTime: '1 hour ago', syncStatus: 'Synced' },
  ]);

  const [isSyncing, setIsSyncing] = useState(false);

  const triggerLakehouseSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setTargets((prev) =>
        prev.map((t) => ({
          ...t,
          syncedRows: t.syncedRows + 5000,
          lastSyncTime: 'Just now',
          syncStatus: 'Synced',
        }))
      );
      setIsSyncing(false);
    }, 700);
  };

  const totalSynced = targets.reduce((sum, t) => sum + t.syncedRows, 0);

  return (
    <div className="modern-card p-6 space-y-6 bg-gradient-to-br from-card via-card to-indigo-500/5 border-indigo-500/20">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <Cloud className="size-5" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-base text-foreground flex items-center gap-2">
              Multi-Cloud Data Lakehouse Sync & Warehouse Bridge
            </h4>
            <p className="text-xs text-muted-foreground">
              Directly streams synthetic datasets to Snowflake Iceberg, Databricks Delta Lake, BigQuery, and S3 Parquet.
            </p>
          </div>
        </div>

        <Button
          onClick={triggerLakehouseSync}
          disabled={isSyncing}
          size="sm"
          className="h-9 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20"
        >
          <RefreshCw className={`size-3.5 mr-1.5 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Pushing Parquet...' : 'Sync All Lakehouses'}
        </Button>
      </div>

      {/* Lakehouse Targets Table */}
      <div className="rounded-2xl border border-border/40 overflow-hidden bg-background/50">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-muted/40 text-muted-foreground text-[10px] uppercase font-bold tracking-wider border-b border-border/30">
            <tr>
              <th className="p-3">Target Lakehouse</th>
              <th className="p-3">Database / Schema</th>
              <th className="p-3">Partition Key</th>
              <th className="p-3">Synced Rows</th>
              <th className="p-3">Sync Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {targets.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3">
                  <div className="font-sans font-bold text-foreground">{t.platform}</div>
                  <div className="text-[10px] text-muted-foreground">{t.lastSyncTime}</div>
                </td>
                <td className="p-3 font-medium text-foreground">
                  <div>{t.databaseName}</div>
                  <div className="text-[10px] text-muted-foreground font-sans">{t.tableName}</div>
                </td>
                <td className="p-3 text-indigo-500 font-mono text-[10px]">{t.partitionKey}</td>
                <td className="p-3 font-bold text-foreground">{t.syncedRows.toLocaleString()}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center gap-1 w-fit">
                    <CheckCircle2 className="size-3" /> {t.syncStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between text-xs text-indigo-500 font-semibold">
        <span className="flex items-center gap-2">
          <Share2 className="size-4" /> {totalSynced.toLocaleString()} Total Records Replicated to 4 Cloud Lakehouse Targets
        </span>
        <span className="font-bold uppercase tracking-wider text-[10px]">Parquet v2.0 Snappy</span>
      </div>
    </div>
  );
}
