create extension if not exists vector;

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  plan text not null default 'free',
  credits integer not null default 10,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  size integer not null,
  page_count integer default 0,
  storage_path text not null,
  status text not null default 'processing',
  uploaded_at timestamptz not null default now()
);

create table chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  content text not null,
  page_number integer,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  document_id uuid references documents(id) on delete set null,
  title text default 'New Chat',
  created_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- Similarity search function
create or replace function match_chunks(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 5,
  filter_document_id uuid default null
)
returns table (id uuid, content text, page_number int, similarity float)
language plpgsql as $$
begin
  return query
  select c.id, c.content, c.page_number,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  where 1 - (c.embedding <=> query_embedding) > match_threshold
    and (filter_document_id is null or c.document_id = filter_document_id)
  order by c.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RLS
alter table profiles enable row level security;
alter table documents enable row level security;
alter table chunks enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

create policy "Users own profiles" on profiles for all using (auth.uid() = id);
create policy "Users own documents" on documents for all using (auth.uid() = user_id);
create policy "Users read own chunks" on chunks for select using (
  document_id in (select id from documents where user_id = auth.uid())
);
create policy "Users own conversations" on conversations for all using (auth.uid() = user_id);
create policy "Users own messages" on messages for all using (
  conversation_id in (select id from conversations where user_id = auth.uid())
);
