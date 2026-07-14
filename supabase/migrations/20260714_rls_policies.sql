-- Enable Row Level Security on all core data tables
ALTER TABLE IF EXISTS public.saved_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.background_jobs ENABLE ROW LEVEL SECURITY;

-- Clean existing policies to prevent duplicate policy names errors
DROP POLICY IF EXISTS "Users can only read their own datasets" ON public.saved_datasets;
DROP POLICY IF EXISTS "Users can only insert their own datasets" ON public.saved_datasets;
DROP POLICY IF EXISTS "Users can only delete their own datasets" ON public.saved_datasets;

DROP POLICY IF EXISTS "Users can only read their own activities" ON public.activity_logs;
DROP POLICY IF EXISTS "Users can only insert their own activities" ON public.activity_logs;

DROP POLICY IF EXISTS "Users can only read their own jobs" ON public.background_jobs;
DROP POLICY IF EXISTS "Users can only manage their own jobs" ON public.background_jobs;

-- 1. saved_datasets table policies
CREATE POLICY "Users can only read their own datasets" 
ON public.saved_datasets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own datasets" 
ON public.saved_datasets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can only delete their own datasets" 
ON public.saved_datasets 
FOR DELETE 
USING (auth.uid() = user_id);

-- 2. activity_logs table policies
CREATE POLICY "Users can only read their own activities" 
ON public.activity_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only insert their own activities" 
ON public.activity_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 3. background_jobs table policies
CREATE POLICY "Users can only read their own jobs" 
ON public.background_jobs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can only manage their own jobs" 
ON public.background_jobs 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
