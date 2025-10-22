import { initDatabase } from '../../lib/db';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await initDatabase();

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Database initialized successfully'
      });
    } else {
      return res.status(500).json({
        error: 'Failed to initialize database',
        details: result.error
      });
    }
  } catch (error) {
    console.error('Error in init-db API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
