import { neon } from '@neondatabase/serverless';

// Initialize Neon client
// You'll need to set DATABASE_URL in your .env.local file
export const sql = neon(process.env.DATABASE_URL);

// Helper function to initialize the database
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS game_sessions (
        id SERIAL PRIMARY KEY,
        player_name VARCHAR(255) NOT NULL,
        score INTEGER NOT NULL,
        won BOOLEAN NOT NULL,
        reward_code VARCHAR(10),
        played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_player_name ON game_sessions(player_name)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_played_at ON game_sessions(played_at)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_won ON game_sessions(won)
    `;

    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: error.message };
  }
}

// Track a game session
export async function trackGameSession(playerName, score, won, rewardCode = null) {
  try {
    const result = await sql`
      INSERT INTO game_sessions (player_name, score, won, reward_code)
      VALUES (${playerName}, ${score}, ${won}, ${rewardCode})
      RETURNING *
    `;
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error tracking game session:', error);
    return { success: false, error: error.message };
  }
}

// Get analytics data
export async function getAnalytics() {
  try {
    // Total games
    const totalGames = await sql`
      SELECT COUNT(*) as count FROM game_sessions
    `;

    // Total wins and losses
    const winLoss = await sql`
      SELECT
        SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN won = false THEN 1 ELSE 0 END) as losses
      FROM game_sessions
    `;

    // Average score
    const avgScore = await sql`
      SELECT AVG(score)::numeric(10,2) as average FROM game_sessions
    `;

    // Games by day
    const gamesByDay = await sql`
      SELECT
        DATE(played_at) as date,
        COUNT(*) as games,
        SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins,
        SUM(CASE WHEN won = false THEN 1 ELSE 0 END) as losses
      FROM game_sessions
      GROUP BY DATE(played_at)
      ORDER BY date DESC
      LIMIT 30
    `;

    // Top players
    const topPlayers = await sql`
      SELECT
        player_name,
        COUNT(*) as games_played,
        SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins,
        MAX(score) as best_score,
        AVG(score)::numeric(10,2) as avg_score
      FROM game_sessions
      GROUP BY player_name
      ORDER BY wins DESC, best_score DESC
      LIMIT 10
    `;

    // Recent games
    const recentGames = await sql`
      SELECT
        player_name,
        score,
        won,
        played_at
      FROM game_sessions
      ORDER BY played_at DESC
      LIMIT 20
    `;

    // Score distribution
    const scoreDistribution = await sql`
      SELECT
        CASE
          WHEN score = 0 THEN '0'
          WHEN score = 20 THEN '20'
          WHEN score = 40 THEN '40'
          WHEN score = 60 THEN '60'
          WHEN score = 80 THEN '80'
          WHEN score = 100 THEN '100'
        END as score_range,
        COUNT(*) as count
      FROM game_sessions
      GROUP BY score
      ORDER BY score
    `;

    return {
      success: true,
      data: {
        totalGames: parseInt(totalGames[0]?.count || 0),
        wins: parseInt(winLoss[0]?.wins || 0),
        losses: parseInt(winLoss[0]?.losses || 0),
        averageScore: parseFloat(avgScore[0]?.average || 0),
        gamesByDay: gamesByDay,
        topPlayers: topPlayers,
        recentGames: recentGames,
        scoreDistribution: scoreDistribution
      }
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return { success: false, error: error.message };
  }
}

// Get player stats
export async function getPlayerStats(playerName) {
  try {
    const stats = await sql`
      SELECT
        COUNT(*) as total_games,
        SUM(CASE WHEN won = true THEN 1 ELSE 0 END) as wins,
        MAX(score) as best_score,
        AVG(score)::numeric(10,2) as avg_score,
        MIN(played_at) as first_played,
        MAX(played_at) as last_played
      FROM game_sessions
      WHERE player_name = ${playerName}
    `;

    const recentGames = await sql`
      SELECT score, won, played_at
      FROM game_sessions
      WHERE player_name = ${playerName}
      ORDER BY played_at DESC
      LIMIT 10
    `;

    return {
      success: true,
      data: {
        ...stats[0],
        recentGames
      }
    };
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return { success: false, error: error.message };
  }
}
