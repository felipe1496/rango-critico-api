create table restaurants (
    id text primary key,
    name varchar(100) not null unique,
    description varchar(400),
    avatar_url varchar(3000),
    created_at timestamptz not null default now()
);