DROP VIEW reviews_detail;

ALTER TABLE reviews
ALTER COLUMN rating TYPE numeric(2,1)
USING rating::numeric;

create view reviews_detail as (
select 
	rv.id as review_id,
	rv.user_id as review_user_id,
	rv.restaurant_id as review_restaurant_id,
	rv.comment as review_comment,
	rv.rating as review_rating,
	rv.visited_at as review_visited_at,
	rv.created_at as review_created_at,
	rt.id as restaurant_id,
	rt.name as restaurant_name,
	rt.description as restaurant_description,
	rt.avatar_url as restaurant_avatar_url,
	rt.created_at as restaurant_created_at
from
	reviews rv
inner join restaurants rt on
	rv.restaurant_id = rt.id);