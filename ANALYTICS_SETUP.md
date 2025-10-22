# Analytics Setup Guide

## Overview

The game now tracks all gameplay sessions in a Neon Postgres database, including:
- Player names
- Scores
- Win/loss status
- Reward codes
- Timestamps
- Retry attempts per player

## Quick Setup

### 1. Create a Neon Database

1. Go to [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up or log in
3. Click "Create Project"
4. Give it a name (e.g., "unlock-the-chain")
5. Copy the connection string

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Add your Neon connection string:
   ```
   DATABASE_URL=postgres://[user]:[password]@[host]/[database]?sslmode=require
   ```

### 3. Initialize the Database

After deploying or running locally, initialize the database by making a POST request:

```bash
curl -X POST http://localhost:3000/api/init-db
# or for production:
curl -X POST https://your-app.vercel.app/api/init-db
```

This creates the `game_sessions` table automatically.

### 4. View Analytics

Visit `/analytics` on your deployed app:
- Local: http://localhost:3000/analytics
- Production: https://your-app.vercel.app/analytics

## Database Schema

```sql
CREATE TABLE game_sessions (
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  won BOOLEAN NOT NULL,
  reward_code VARCHAR(10),
  played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### POST `/api/track-game`
Track a completed game session.

**Request:**
```json
{
  "playerName": "ALICE",
  "score": 80,
  "won": true,
  "rewardCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Game session tracked successfully",
  "data": { ... }
}
```

### GET `/api/analytics`
Get overall analytics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalGames": 150,
    "wins": 95,
    "losses": 55,
    "averageScore": 67.5,
    "gamesByDay": [...],
    "topPlayers": [...],
    "recentGames": [...],
    "scoreDistribution": [...]
  }
}
```

### GET `/api/analytics?player=ALICE`
Get stats for a specific player.

**Response:**
```json
{
  "success": true,
  "data": {
    "total_games": 3,
    "wins": 2,
    "best_score": 100,
    "avg_score": 73.33,
    "first_played": "2025-10-22T10:00:00Z",
    "last_played": "2025-10-22T14:30:00Z",
    "recentGames": [...]
  }
}
```

### POST `/api/init-db`
Initialize the database schema (run once).

### POST `/api/reset-db`
Reset the database by deleting all game data.

⚠️ **WARNING: This is destructive and cannot be undone!**

**Request:**
```json
{
  "confirmationCode": "RESET_ALL_DATA"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Database reset successfully",
  "deletedRecords": 150
}
```

**Usage (3 methods):**

**Method 1: NPM Script (Recommended)**
```bash
npm run reset-db
# Interactive CLI with double confirmation
```

**Method 2: Analytics Dashboard UI**
```
1. Visit /analytics
2. Click "Reset DB" button (top right)
3. Confirm in the modal dialog
```

**Method 3: Direct API Call**
```bash
curl -X POST http://localhost:3000/api/reset-db \
  -H "Content-Type: application/json" \
  -d '{"confirmationCode":"RESET_ALL_DATA"}'
```

**When to use:**
- Between testing sessions
- Before starting a new event
- To clear out demo data
- After completing an event

**Important Notes:**
- The confirmation code `RESET_ALL_DATA` is required
- All data is permanently deleted
- The table structure remains intact
- Auto-increment IDs are reset to 1
- There is a UI button in the analytics dashboard with a confirmation modal

## Analytics Dashboard Features

The `/analytics` page shows:

1. **Overview Stats**
   - Total games played
   - Total wins
   - Total "try again" results
   - Win rate percentage

2. **Average Score**
   - Overall average across all games

3. **Score Distribution**
   - Breakdown of how many players scored 0, 20, 40, 60, 80, 100 points

4. **Games by Day**
   - Daily totals with wins/losses
   - Last 30 days

5. **Top Players**
   - Leaderboard showing:
     - Number of games played
     - Total wins
     - Best score
     - Average score
   - Top 10 players

6. **Recent Games**
   - Last 20 game sessions
   - Real-time updates (auto-refresh every 30 seconds)

7. **Database Management**
   - Reset DB button (with confirmation modal)
   - Shows total records before deletion
   - Auto-refresh after reset
   - Confirmation code required for safety

## Deployment Notes

### Vercel Deployment

1. Add `DATABASE_URL` to your Vercel environment variables:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `DATABASE_URL` with your Neon connection string
   - Apply to Production, Preview, and Development

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Initialize database:
   ```bash
   curl -X POST https://your-app.vercel.app/api/init-db
   ```

### Security Considerations

- The analytics page is **publicly accessible** by default
- For production, consider adding authentication:
  - Password protection
  - API key requirement
  - IP whitelist
  - Or make it a protected route

Example: Add password protection to `/analytics`:

```javascript
// pages/analytics.js
import { useState } from 'react';

export default function Analytics() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          <h1 className="text-2xl font-bold mb-4">Analytics Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && password === 'your-secret-password') {
                setAuthenticated(true);
              }
            }}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20"
            placeholder="Enter password"
          />
        </div>
      </div>
    );
  }

  // ... rest of analytics page
}
```

## Querying the Database

You can query your Neon database directly using their SQL Editor or via psql:

```bash
psql "postgres://[user]:[password]@[host]/[database]?sslmode=require"
```

### Useful Queries

**Players with most retries:**
```sql
SELECT
  player_name,
  COUNT(*) as attempts,
  SUM(CASE WHEN won THEN 1 ELSE 0 END) as wins
FROM game_sessions
GROUP BY player_name
HAVING COUNT(*) > 1
ORDER BY attempts DESC;
```

**Hourly activity:**
```sql
SELECT
  DATE_TRUNC('hour', played_at) as hour,
  COUNT(*) as games
FROM game_sessions
WHERE played_at >= NOW() - INTERVAL '24 hours'
GROUP BY hour
ORDER BY hour DESC;
```

**Win rate by time of day:**
```sql
SELECT
  EXTRACT(HOUR FROM played_at) as hour,
  COUNT(*) as games,
  ROUND(AVG(CASE WHEN won THEN 1.0 ELSE 0.0 END) * 100, 2) as win_rate
FROM game_sessions
GROUP BY hour
ORDER BY hour;
```

## Troubleshooting

**Error: "Failed to fetch analytics"**
- Check that `DATABASE_URL` is set correctly
- Ensure you've run `/api/init-db` to create tables
- Verify Neon project is active (not paused)

**No data showing:**
- Play a few games first
- Check browser console for errors
- Verify `/api/track-game` is being called successfully

**Connection timeout:**
- Neon free tier may pause after inactivity
- First request wakes it up (may take 5-10 seconds)
- Consider upgrading to a paid plan for instant connections

## Cost Considerations

**Neon Free Tier:**
- ✅ 3 GB storage
- ✅ Unlimited queries
- ✅ Perfect for events with thousands of games
- ⚠️ Projects pause after inactivity

**When to Upgrade:**
- Large multi-day events
- Need instant connections (no cold starts)
- Want data retention beyond 7 days

## Support

For issues or questions:
- Neon Docs: https://neon.tech/docs
- Project Issues: [GitHub Issues URL]
