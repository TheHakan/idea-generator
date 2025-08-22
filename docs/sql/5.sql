create or replace function upvote_idea(idea_id int, user_id uuid)
returns void as $$
begin
  if not exists (
    select 1 from idea_votes v
    where v.idea_id = upvote_idea.idea_id and v.user_id = upvote_idea.user_id
  ) then
    insert into idea_votes (idea_id, user_id) values (idea_id, user_id);
    update ideas set votes = votes + 1 where ideas.id = idea_id;
  end if;
end;
$$ language plpgsql security definer;