import { sql } from '../../lib/db';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { confirmationCode } = req.body;

    // Require confirmation code to prevent accidental resets
    if (confirmationCode !== 'RESET_ALL_DATA') {
      return res.status(400).json({
        error: 'Invalid confirmation code',
        message: 'You must provide confirmationCode: "RESET_ALL_DATA" to reset the database'
      });
    }

    // Get count before deletion
    const beforeCount = await sql`
      SELECT COUNT(*) as count FROM game_sessions
    `;

    // Delete all records
    const result = await sql`
      TRUNCATE TABLE game_sessions RESTART IDENTITY CASCADE
    `;

    // Reset the auto-increment counter
    await sql`
      ALTER SEQUENCE game_sessions_id_seq RESTART WITH 1
    `;

    return res.status(200).json({
      success: true,
      message: 'Database reset successfully',
      deletedRecords: parseInt(beforeCount[0]?.count || 0)
    });
  } catch (error) {
    console.error('Error in reset-db API:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
