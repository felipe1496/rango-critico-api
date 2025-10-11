create table reviews (
    id text primary key not null,
    user_id text not null references users(id),
    restaurant_id text not null references restaurants(id),
    comment varchar(5000),
    rating integer not null,
    visited_at timestamptz not null,
    created_at timestamptz not null default now()
);