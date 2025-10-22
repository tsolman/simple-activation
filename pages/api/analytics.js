import { getAnalytics, getPlayerStats, initDatabase } from '../../lib/db';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { player } = req.query;

    // If player name is provided, get player-specific stats
    if (player) {
      const result = await getPlayerStats(player);

      if (result.success) {
        return res.status(200).json({
          success: true,
          data: result.data
        });
      } else {
        return res.status(500).json({
          error: 'Failed to fetch player stats',
          details: result.error
        });
      }
    }

    // Otherwise, get general analytics
    const result = await getAnalytics();

    if (result.success) {
      return res.status(200).json({
        success: true,
        data: result.data
      });
    } else {
      return res.status(500).json({
        error: 'Failed to fetch analytics',
        details: result.error
      });
    }
  } catch (error) {
    console.error('Error in analytics API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
