-- Active: 1699018831967@@127.0.0.1@3306
DROP TABLE users;
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
     created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
);

INSERT INTO users(id, name, email, password, role)
VALUES
('u001', 'Anderson', 'anderson@email.com', 'and@123', 'admin'),
('u002', 'Patricia', 'patricia@email.com', 'pati@123', 'user'),
('u003', 'Everton', 'everton@email.com', 'eve@123', 'user'),
('u004', 'Jeferson', 'jeferson@email.com', 'jef@123', 'user');

SELECT * FROM users;


DROP TABLE posts;


CREATE TABLE posts (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER NOT NULL,
  dislikes INTEGER NOT NULL,
  created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
  updated_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
--   FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
  ('post1', 'user1', 'Primeiro post', 10, 2),
  ('post2', 'user2', 'Segundo post', 8, 3),
  ('post3', 'user3', 'Terceiro post', 12, 1),
  ('post4', 'user4', 'Quarto post', 15, 5),
  ('post5', 'user5', 'Quinto post', 20, 0);

SELECT * FROM posts;


-- CREATE TABLE likes_dislikes (
--   user_id TEXT NOT NULL,
--   post_id TEXT NOT NULL,
--   like INTEGER NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES users (id)
--     ON UPDATE CASCADE
--     ON DELETE CASCADE,
--   FOREIGN KEY (post_id) REFERENCES posts (id)
--     ON UPDATE CASCADE
--     ON DELETE CASCADE
-- );

-- INSERT INTO likes_dislikes
-- VALUES
-- (
--   'u002',
--   'v001',
--   1
-- ),
-- (
--   'u002',
--   'v002',
--   0
-- );

-- INSERT INTO likes_dislikes
-- VALUES
-- (
--   'u001',
--   'v001',
--   1
-- ),
-- (
--   'u001',
--   'v002',
--   1
-- );

-- UPDATE posts
-- SET likes = 1
-- WHERE id = 'v001';

-- UPDATE posts
-- SET dislikes = 1
-- WHERE id = 'v002';



