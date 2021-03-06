-- Drop and recreate todos table

DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  task VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  important_tasks BOOLEAN NOT NULL DEFAULT FALSE
);
