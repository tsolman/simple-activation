import { trackGameSession, initDatabase } from '../../lib/db';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { playerName, score, won, rewardCode } = req.body;

    // Validate required fields
    if (!playerName || score === undefined || won === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: playerName, score, won'
      });
    }

    // Validate data types
    if (typeof playerName !== 'string' || typeof score !== 'number' || typeof won !== 'boolean') {
      return res.status(400).json({
        error: 'Invalid data types'
      });
    }

    // Track the game session
    const result = await trackGameSession(
      playerName,
      score,
      won,
      rewardCode || null
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Game session tracked successfully',
        data: result.data
      });
    } else {
      return res.status(500).json({
        error: 'Failed to track game session',
        details: result.error
      });
    }
  } catch (error) {
    console.error('Error in track-game API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
