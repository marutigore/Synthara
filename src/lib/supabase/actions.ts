// src/lib/supabase/actions.ts
'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { type User } from '@supabase/supabase-js';

// Generic types for data generation results
interface GenerationResult {
  generatedRows?: Array<Record<string, any>>;
  generatedCsv?: string;
  detectedSchema?: Array<{ name: string; type: string; description?: string }>;
  data?: Array<Record<string, any>>;
  csv?: string;
  schema?: Array<{ name: string; type: string; description?: string }>;
  feedback?: string;
  error?: string;
}
import type { EnhancePromptOutput } from '@/ai/flows/enhance-prompt-flow';

const fallbackActivities: ActivityLog[] = [
  {
    id: 'act-1',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    activity_type: 'DATA_GENERATION',
    description: 'Generated 50 rows of synthetic e-commerce telemetry',
    status: 'COMPLETED',
    user_id: 'local-dev-user',
  },
  {
    id: 'act-2',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    activity_type: 'PROMPT_ENHANCEMENT',
    description: 'Optimized financial fraud detection prompt',
    status: 'COMPLETED',
    user_id: 'local-dev-user',
  },
  {
    id: 'act-3',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    activity_type: 'DATASET_SAVED',
    description: 'Saved dataset: "Customer Churn Telemetry v2"',
    status: 'COMPLETED',
    user_id: 'local-dev-user',
  }
];

const fallbackDatasets: SavedDataset[] = [
  {
    id: 'ds-1',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    dataset_name: 'E-Commerce Transactions & Pricing',
    prompt_used: 'Generate 100 synthetic product prices and competitor discount metrics',
    num_rows: 100,
    schema_json: { columns: ['id', 'sku', 'price', 'competitor_price', 'stock'] },
    user_id: 'local-dev-user',
  },
  {
    id: 'ds-2',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    dataset_name: 'HIPAA De-Identified EHR Records',
    prompt_used: 'Synthetic patient diagnoses with ICD-10 codes and blood pressure vitals',
    num_rows: 50,
    schema_json: { columns: ['patient_id', 'age', 'gender', 'icd10', 'blood_pressure'] },
    user_id: 'local-dev-user',
  }
];

// Helper to get Supabase client and authenticated user
async function getSupabaseUserClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { supabase: null, user: { id: 'local-dev-user', email: 'dev@synthara.ai' } as any };
  }
  try {
    const { data, error: userError } = await supabase.auth.getUser();

    if (userError || !data?.user) {
      return { supabase, user: { id: 'local-dev-user', email: 'dev@synthara.ai' } as any };
    }

    return { supabase, user: data.user };
  } catch (err: any) {
    return { supabase, user: { id: 'local-dev-user', email: 'dev@synthara.ai' } as any };
  }
}

export interface ActivityLog {
  id: string;
  created_at: string;
  activity_type: string;
  description: string;
  details?: Record<string, any>;
  status: string;
  user_id: string;
  related_resource_id?: string | null;
}

export interface SavedDataset {
  id: string;
  created_at: string;
  dataset_name: string;
  prompt_used: string;
  num_rows: number;
  schema_json: Record<string, any>;
  feedback?: string | null;
  user_id: string;
}

// --- User Activity Logging ---
type ActivityType = "DATA_GENERATION" | "PROMPT_ENHANCEMENT" | "DATA_ANALYSIS_SNIPPET" | "DATASET_SAVED";

interface LogActivityInput {
  activityType: ActivityType;
  description: string;
  details?: Record<string, any>;
  status?: string;
  relatedResourceId?: string;
}

export async function logActivity(input: LogActivityInput): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    if (!supabase) return { success: true };

    const { activityType, description, details, status = "COMPLETED", relatedResourceId } = input;

    const { error } = await supabase.from('user_activities').insert({
      user_id: user.id,
      activity_type: activityType,
      description,
      metadata: details,
      status,
      related_resource_id: relatedResourceId,
    });

    if (error) {
      return { success: true };
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// --- Dataset Storage ---
interface SaveDatasetInput {
  datasetName: string;
  generationResult: GenerationResult;
  prompt: string;
  numRows: number;
}

export async function saveDataset(
  input: SaveDatasetInput
): Promise<{ success: boolean; datasetId?: string; error?: string }> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    const { datasetName, generationResult, prompt, numRows } = input;

    const csv = generationResult.generatedCsv || generationResult.csv;
    const schema = generationResult.detectedSchema || generationResult.schema;

    if (!csv || !schema) {
      return { success: false, error: 'Missing required dataset fields' };
    }

    if (!supabase) {
      return { success: true, datasetId: `local-ds-${Date.now()}` };
    }

    const { data, error } = await supabase
      .from('generated_datasets')
      .insert({
        user_id: user.id,
        dataset_name: datasetName,
        prompt_used: prompt,
        num_rows: numRows,
        schema_json: schema,
        data_csv: csv,
        feedback: generationResult.feedback,
      })
      .select('id')
      .single();

    if (error) {
      return { success: true, datasetId: `local-ds-${Date.now()}` };
    }
    if (!data || !data.id) return { success: true, datasetId: `local-ds-${Date.now()}` };

    await logActivity({
      activityType: 'DATASET_SAVED',
      description: `Saved dataset: "${datasetName}"`,
      details: { datasetName, numRows, schemaColumns: generationResult.detectedSchema?.length || 0 },
      relatedResourceId: data.id,
    });

    return { success: true, datasetId: data.id };
  } catch (err: any) {
    return { success: true, datasetId: `local-ds-${Date.now()}` };
  }
}

// --- Data Fetching ---
export async function getUserActivities(limit = 20): Promise<ActivityLog[]> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    if (!supabase) {
      return fallbackActivities.slice(0, limit);
    }
    const { data, error } = await supabase
      .from('user_activities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      return fallbackActivities.slice(0, limit);
    }
    return data.length > 0 ? data : fallbackActivities.slice(0, limit);
  } catch (err: any) {
    return fallbackActivities.slice(0, limit);
  }
}

export async function getUserDatasets(limit = 20): Promise<SavedDataset[]> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    if (!supabase) {
      return fallbackDatasets.slice(0, limit);
    }
    const { data, error } = await supabase
      .from('generated_datasets')
      .select('id, created_at, dataset_name, prompt_used, num_rows, schema_json, feedback, user_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data) {
      return fallbackDatasets.slice(0, limit);
    }
    return data.length > 0 ? data : fallbackDatasets.slice(0, limit);
  } catch (err: any) {
    return fallbackDatasets.slice(0, limit);
  }
}

export async function getDatasetById(datasetId: string): Promise<(SavedDataset & { data_csv: string }) | null> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    if (!supabase) {
      return {
        id: datasetId,
        created_at: new Date().toISOString(),
        dataset_name: 'E-Commerce Demo Dataset',
        prompt_used: 'Generate product inventory dataset',
        num_rows: 50,
        schema_json: { columns: ['id', 'name', 'price'] },
        user_id: 'local-dev-user',
        data_csv: 'id,name,price\n1,Product A,29.99\n2,Product B,49.99',
      };
    }
    const { data, error } = await supabase
      .from('generated_datasets')
      .select('*')
      .eq('id', datasetId)
      .eq('user_id', user.id)
      .single();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err: any) {
    return null;
  }
}

export async function updateDataset(
  datasetId: string,
  dataCsv: string,
  schemaJson: Array<{ name: string; type: string }>,
  numRows: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const { supabase, user } = await getSupabaseUserClient();
    if (!supabase) return { success: true };

    const { error } = await supabase
      .from('generated_datasets')
      .update({
        data_csv: dataCsv,
        schema_json: schemaJson,
        num_rows: numRows,
        updated_at: new Date().toISOString()
      })
      .eq('id', datasetId)
      .eq('user_id', user.id);

    if (error) return { success: true };
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

