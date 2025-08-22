create table if not exists feedback (
  id serial primary key,
  type text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc', now())
);