-- 1. Track votes per user
create table if not exists idea_votes (
  id serial primary key,
  idea_id int references ideas(id) on delete cascade,
  user_id uuid references auth.users on delete cascade,
  unique (idea_id, user_id)
);

-- 2. Upvote function: only allow one upvote per user
create or replace function upvote_idea(idea_id int, user_id uuid)
returns void as $$
begin
  if not exists (select 1 from idea_votes where idea_id = upvote_idea.idea_id and user_id = upvote_idea.user_id) then
    insert into idea_votes (idea_id, user_id) values (idea_id, user_id);
    update ideas set votes = votes + 1 where id = idea_id;
  end if;
end;
$$ language plpgsql security definer;