const { pool } = require('./db_conexion');

let competitor_id = 0;

const getCompetitors = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM competitors ORDER BY competitor_id ASC'
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getCompetitorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM competitors WHERE competitor_id = (?)', [id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Event not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createCompetitor = async (req, res) => {
    try {
        const { event_name, sport, description, wins, losses } = req.body;
        const [result] = await pool.query(
            'INSERT INTO competitors (user_id, event_name, sport, description, wins, losses) VALUES (?, ?, ?, ?, ? ,?)', [
            4, //user_id
            event_name,
            sport,
            description,
            wins,
            losses
        ]);
        res.status(200).json({ message: "Competitor created succecsfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {

    try {
        const [result] = await pool.query(
            'UPDATE events SET ? WHERE event_id = (?)', [
            req.body,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM events where event_id = (?)', [
            req.params.id
        ]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Event not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCompetitors,
    getCompetitorId,
    createEvent,
    updateEvent,
    deleteEvent
};