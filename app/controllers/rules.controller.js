const { pool } = require('./db_conexion');

const getRules = async (req, res) => {
    const event_id = parseInt(req.params.event_id);
    const response = await pool.query('SELECT * FROM rules WHERE event_id = $1', [event_id]);
    res.json(response.rows);
};

const createRules = async (req, res) => {
    const { event_id, wins, losses } = req.body;
    const response = await pool.query('INSERT INTO rules (event_id, wins, losses) VALUES ($1, $2, $3)', [
        event_id,
        wins,
        losses
    ]);
};

const updateRules = async (req, res) => {
    const id = parseInt(req.params.id);
    const { event_id, wins, losses } = req.body;

    const response = await pool.query('UPDATE rules SET wins = $2, losses = $3 WHERE id = $1', [
        event_id,
        wins,
        losses
    ]);
};

const deleteRules = async (req, res) => {
    const event_id = parseInt(req.params.event_id);
    await pool.query('DELETE FROM rules where event_id = $1', [
        event_id
    ]);
};

module.exports = {
    getRules,
    createRules,
    updateRules,
    deleteRules
};