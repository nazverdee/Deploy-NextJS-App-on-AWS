import pool from '../../../lib/db';

export async function GET(req) {
  try {
    const result = await pool.query('SELECT NOW()');
    return new Response(JSON.stringify({ time: result.rows[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
