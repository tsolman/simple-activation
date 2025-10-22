-- Database schema for Unlock the Chain game analytics
-- This file is for reference - the table will be created automatically via the API

CREATE TABLE IF NOT EXISTS game_sessions (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  won BOOLEAN NOT NULL,
  reward_code VARCHAR(10),
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_player_name ON game_sessions(player_name);
CREATE INDEX IF NOT EXISTS idx_played_at ON game_sessions(played_at);
CREATE INDEX IF NOT EXISTS idx_won ON game_sessions(won);

-- Sample queries:

-- Total games by day
SELECT
  DATE(played_at) as date,
  COUNT(*) as games,
  SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins
FROM game_sessions
GROUP BY DATE(played_at)
ORDER BY date DESC;

-- Top players
SELECT
  player_name,
  COUNT(*) as games_played,
  SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins,
  MAX(score) as best_score
FROM game_sessions
GROUP BY player_name
ORDER BY wins DESC;

-- Player retry count
SELECT
  player_name,
  COUNT(*) as attempts,
  MAX(score) as best_score,
  MIN(played_at) as first_attempt,
  MAX(played_at) as last_attempt
FROM game_sessions
GROUP BY player_name
HAVING COUNT(*) > 1
ORDER BY attempts DESC;
