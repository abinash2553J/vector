-- ============================================================
-- Feature 04 — Database Schema
-- Creates: profiles, agent_runs, jobs, agent_logs
-- With: RLS policies, indexes, updated_at trigger
-- ============================================================

-- ── 1. profiles ─────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name           text,
  email               text,
  phone               text,
  location            text,
  current_title       text,
  experience_level    text,
  years_experience    integer,
  skills              text[],
  industries          text[],
  work_experience     jsonb,
  education           jsonb,
  job_titles_seeking  text[],
  remote_preference   text,
  preferred_locations text[],
  salary_expectation  text,
  cover_letter_tone   text,
  linkedin_url        text,
  portfolio_url       text,
  work_authorization  text,
  resume_pdf_url      text,
  is_complete         boolean     NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- updated_at auto-trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = id);


-- ── 2. agent_runs ───────────────────────────────

CREATE TABLE IF NOT EXISTS public.agent_runs (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status              text        NOT NULL DEFAULT 'running',
  job_title_searched  text,
  location_searched   text,
  jobs_found          integer,
  started_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz
);

CREATE INDEX IF NOT EXISTS idx_agent_runs_user_id ON public.agent_runs(user_id);

-- RLS
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent runs"
  ON public.agent_runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agent runs"
  ON public.agent_runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent runs"
  ON public.agent_runs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent runs"
  ON public.agent_runs FOR DELETE
  USING (auth.uid() = user_id);


-- ── 3. jobs ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.jobs (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id              uuid        REFERENCES public.agent_runs(id) ON DELETE SET NULL,
  user_id             uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  source              text        NOT NULL,
  source_url          text,
  external_apply_url  text,
  title               text        NOT NULL,
  company             text        NOT NULL,
  location            text,
  salary              text,
  job_type            text,
  about_role          text,
  responsibilities    text[],
  requirements        text[],
  nice_to_have        text[],
  benefits            text[],
  about_company       text,
  match_score         integer,
  match_reason        text,
  matched_skills      text[],
  missing_skills      text[],
  company_research    jsonb,
  found_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_jobs_user_id     ON public.jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_run_id      ON public.jobs(run_id);
CREATE INDEX IF NOT EXISTS idx_jobs_match_score ON public.jobs(match_score);
CREATE INDEX IF NOT EXISTS idx_jobs_found_at    ON public.jobs(found_at);

-- RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own jobs"
  ON public.jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own jobs"
  ON public.jobs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own jobs"
  ON public.jobs FOR DELETE
  USING (auth.uid() = user_id);


-- ── 4. agent_logs ───────────────────────────────

CREATE TABLE IF NOT EXISTS public.agent_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id      uuid        NOT NULL REFERENCES public.agent_runs(id) ON DELETE CASCADE,
  user_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message     text        NOT NULL,
  level       text        NOT NULL DEFAULT 'info',
  job_id      uuid        REFERENCES public.jobs(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_agent_logs_run_id  ON public.agent_logs(run_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_user_id ON public.agent_logs(user_id);

-- RLS
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent logs"
  ON public.agent_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agent logs"
  ON public.agent_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent logs"
  ON public.agent_logs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own agent logs"
  ON public.agent_logs FOR DELETE
  USING (auth.uid() = user_id);
