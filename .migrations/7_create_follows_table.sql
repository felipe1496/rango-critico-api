CREATE TABLE follows (
    id TEXT PRIMARY KEY,
    follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    followed_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT unique_follow UNIQUE (follower_id, followed_id),
    CONSTRAINT chk_no_self_follow CHECK (follower_id <> followed_id)
);