-- CREATE DATABASE treadsdb_dev;

-- \c treadsdb_dev

-- -- Create the users table table and its indexes
-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(50) UNIQUE NOT NULL,
--   email VARCHAR(255) UNIQUE NOT NULL,
--   password_hash VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   is_active BOOLEAN DEFAULT true,
--   last_login TIMESTAMP WITH TIME ZONE,
--   failed_login_attempts INTEGER DEFAULT 0,
--   locked_until TIMESTAMP WITH TIME ZONE
-- );

-- --CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- -- Create the roles table
-- CREATE TABLE IF NOT EXISTS roles (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(50)
-- );

-- -- Create the refresh tokens table that references the users primary key and its indexes
-- CREATE TABLE IF NOT EXISTS refresh_tokens (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   token_hash VARCHAR(255) NOT NULL,
--   expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   is_revoked BOOLEAN DEFAULT false
-- );

-- CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
-- CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);


-- INSERT INTO users (id, name, email, password_hash) VALUES
--   (1, 'Navy Suman', 'navy@example.com', 'password'),
--   (2, 'Sasha Nālani', 'sasha@example.com', 'password'),
--   (3, 'Chris Rayne', 'chris@example.com', 'password'),
--   (4, 'Jong Isi', 'jong@example.com', 'password'),
--   (5, 'Tumelo Fidelis ', 'tumelo@example.com', 'password')
-- ON CONFLICT (ID) DO NOTHING;

-- -- Insert rows into the database!
-- INSERT INTO roles (id, name) VALUES
--   (1, 'admin'),
--   (2, 'moderator'),
--   (3, 'user')
-- ON CONFLICT (ID) DO NOTHING;