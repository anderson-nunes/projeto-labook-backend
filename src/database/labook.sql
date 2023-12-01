-- Active: 1701193546022@@127.0.0.1@3306

-- primeiro delete as tabelas de relação
DROP TABLE likes_dislikes;
-- depois as tabelas com chave estrangeiras
DROP TABLE posts;
-- por fim as tabelas principais
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
('u001', 'Anderson', 'anderson@email.com', 'and123', 'ADMIN'),
('u002', 'Patricia', 'patricia@email.com', 'pati123', 'NORMAL');

SELECT * FROM users;

CREATE TABLE posts (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  created_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
  updated_at DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime')),
  FOREIGN KEY (creator_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO posts (id, creator_id, content)
VALUES
  ('p001', 'u001', 'Primeiro post'),
  ('p002', 'u002', 'Segundo post');

SELECT * FROM posts;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO likes_dislikes
VALUES
(
  'u002',
  'p001',
  1
),
(
  'u003',
  'p001',
  1
);

SELECT * FROM likes_dislikes;

UPDATE posts
SET likes = 2
WHERE id = 'p001';

UPDATE posts
SET likes = 1, dislikes = 1
WHERE id = 'p002';



