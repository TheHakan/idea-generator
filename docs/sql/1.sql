create table if not exists ideas (
  id serial primary key,
  title text not null,
  description text not null,
  is_private boolean not null default false,
  votes integer not null default 0,
  user_id uuid references auth.users
);