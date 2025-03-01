-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    total_distance FLOAT DEFAULT 0,
    weekly_flair BOOLEAN DEFAULT FALSE
);

-- Runs Table (Fixed Syntax Error)
CREATE TABLE runs (
    run_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    distance FLOAT NOT NULL,
    route_coords JSONB NOT NULL
);

-- Territories Table
CREATE TABLE territories (
    territory_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    run_id INT REFERENCES runs(run_id) ON DELETE CASCADE,
    polygon_coords JSONB NOT NULL,
    claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leaderboard Table (Added rank_num)
CREATE TABLE leaderboards (
    leaderboard_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    total_territory FLOAT NOT NULL,
    rank_num INT DEFAULT NULL 
);
