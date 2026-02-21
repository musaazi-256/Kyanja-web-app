create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  image text,
  password_hash text not null,
  role text not null default 'ADMIN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admission_applications (
  id uuid primary key default gen_random_uuid(),
  surname text not null,
  fore_name text not null,
  date_of_birth date not null,
  religious_belief text not null,
  passport_photo_url text,
  previous_schools jsonb not null default '[]'::jsonb,
  vaccination_polio boolean not null default false,
  vaccination_typhoid boolean not null default false,
  vaccination_measles boolean not null default false,
  health_others text,
  parent_name text not null,
  residence text not null,
  email text not null,
  tel_home text not null,
  tel_office text,
  occupation text not null,
  nin text not null,
  next_of_kin text not null,
  declaration_accepted boolean not null,
  digital_signature text not null,
  signed_date date not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt_text text not null,
  created_at timestamptz not null default now()
);

do $$
begin
  if not exists (select 1 from pg_type where typname = 'media_section') then
    create type media_section as enum ('HERO', 'PHILOSOPHY', 'TEAM', 'SCHOOL_CLUBS', 'ADS_BANNER');
  end if;
end $$;

create table if not exists public.managed_images (
  id uuid primary key default gen_random_uuid(),
  section media_section not null,
  image_url text,
  mobile_image_url text,
  title text not null,
  subtitle text,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_managed_images_section_active_order
  on public.managed_images (section, is_active, sort_order, created_at desc);

