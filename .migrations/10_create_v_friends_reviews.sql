create or replace view v_friends_reviews as
with vrd as (
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
		rv.restaurant_id = rt.id
),
follower_friends_reviews as (
	select
		f.follower_id,
		vrd.*
	from
		follows f
	join vrd on
		f.followed_id = vrd.review_user_id
)
select
	u.username as followed_username,
	u.avatar_url as followed_avatar_url,
	u.name as followed_name,
	ffr.*
from
	follower_friends_reviews ffr
join users u on
	ffr.review_user_id = u.id

