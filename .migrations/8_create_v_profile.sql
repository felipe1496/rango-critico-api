create or replace view v_profile as (
select
    u.id,
	u.name,
	u.avatar_url,
	u.username,
	(select count(*) from follows where followed_id = u.id) as followers,
	(select count(*) from follows where follower_id = u.id) as following
from
	users u);