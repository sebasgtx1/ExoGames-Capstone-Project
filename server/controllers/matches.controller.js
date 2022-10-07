const { pool } = require('./db_conexion');

let match_id = 0;

const getMatches = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM matches ORDER BY match_id ASC'
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMatchId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM matches WHERE match_id = (?)', [id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Match not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createMatch = async (req, res) => {
    try {
        const { competitor1_id, competitor2_id, event_id } = req.body;
        const [result] = await pool.query(
            'INSERT INTO matches (match_id, competitor1_id, competitor2_id, event_id) VALUES (?, ?, ?, ?)', [
            4, //competitor_id
            competitor1_id,
            competitor2_id,
            event_id
        ]);
        res.status(200).json({ message: "Competitor created succecsfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateMatch = async (req, res) => {

    try {
        const [result] = await pool.query(
            'UPDATE matches SET ? WHERE match_id = (?)', [
            req.body,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteMatch = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM matches where match_id = (?)', [
            req.params.id
        ]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Match not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMatches,
    getMatchId,
    createMatch,
    updateMatch,
    deleteMatch
};