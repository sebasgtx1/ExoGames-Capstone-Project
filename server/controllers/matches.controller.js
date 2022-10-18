const { pool } = require('./db_conexion');

const getMatchesId = async (req, res) => {
    try {
        const event_id = parseInt(req.params.event_id);
        const [result] = await pool.query(
            'SELECT * FROM matches WHERE event_id = (?)', [event_id]
        );
        if (result.length === 0)
            return res.json({ message: "Matches not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMatch = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM matches WHERE match_id = (?)', [id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Matches not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createMatch = async (req, res) => {
    try {
        const event_id = parseInt(req.params.event_id);
        const { competitor1_id, competitor2_id, venue_id, competitor1_group, competitor2_group, date, time } = req.body;
        const [result] = await pool.query(
            'INSERT INTO matches (event_id, competitor1_id, competitor2_id, venue_id, competitor1_group, competitor2_group, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            event_id,
            competitor1_id,
            competitor2_id,
            venue_id,
            competitor1_group,
            competitor2_group,
            date,
            time
        ]);
        res.json({
            event_id: event_id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateMatch = async (req, res) => {

    try {
        const [result] = await pool.query(
            'UPDATE matches SET ? WHERE match_id = (?)', [
            req.body,
            req.params.match_id
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
            req.params.match_id
        ]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Match not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteMatches = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM matches where event_id = (?)', [
            req.params.event_id
        ]);
        if (result.affectedRows === 0)
            return res.json({ message: "Matches not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getMatchesId,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch,
    deleteMatches
};