create or replace function upvote_idea(idea_id int)
returns void as $$
begin
  update ideas set votes = votes + 1 where id = idea_id;
end;
$$ language plpgsql;