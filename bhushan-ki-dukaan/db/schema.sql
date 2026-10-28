-- Bhushan Ki Dukaan database schema. Safe to re-run: every statement is idempotent.
-- Apply with: npm run db:setup

-- Staff who can sign in to /admin. roles: {'owner'} = everything, else section names
-- ('website','sales','operations','hr','marketing','tech').
CREATE TABLE IF NOT EXISTS admin_users (
  id            serial PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  name          text NOT NULL,
  password_hash text NOT NULL,
  roles         text[] NOT NULL DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Login sessions. Only a SHA-256 hash of the cookie token is stored.
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash text PRIMARY KEY,
  user_id    integer NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS admin_sessions_user_idx ON admin_sessions (user_id);

-- Editable website content, one JSON document per key (e.g. 'homepage').
CREATE TABLE IF NOT EXISTS site_content (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by integer REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Costume catalog.
CREATE TABLE IF NOT EXISTS products (
  id          serial PRIMARY KEY,
  name        text NOT NULL,
  tier        text NOT NULL CHECK (tier IN ('mass','premium','luxury')),
  size        text NOT NULL CHECK (size IN ('kids','adult','custom')),
  style       text NOT NULL CHECK (style IN ('traditional','folk','festive','bridal')),
  sale_type   text NOT NULL CHECK (sale_type IN ('rent','both','buy','bespoke')),
  price       integer NOT NULL CHECK (price >= 0),
  per_day     boolean NOT NULL DEFAULT false,
  description text NOT NULL DEFAULT '',
  sort_order  integer NOT NULL DEFAULT 0,
  active      boolean NOT NULL DEFAULT true,
  image       text NOT NULL DEFAULT '',
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Added after launch; keeps databases created earlier in step
ALTER TABLE products ADD COLUMN IF NOT EXISTS image text NOT NULL DEFAULT '';

-- Sales CRM: every booking request and bag order from the website.
CREATE TABLE IF NOT EXISTS leads (
  id          serial PRIMARY KEY,
  kind        text NOT NULL CHECK (kind IN ('booking','order','enquiry')),
  name        text NOT NULL DEFAULT '',
  phone       text NOT NULL DEFAULT '',
  details     jsonb NOT NULL DEFAULT '{}',
  status      text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','quoted','won','lost')),
  notes       text NOT NULL DEFAULT '',
  follow_up   date,
  source      text NOT NULL DEFAULT 'website',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status, created_at DESC);
