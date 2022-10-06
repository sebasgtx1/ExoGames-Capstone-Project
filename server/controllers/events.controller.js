const { pool } = require('./db_conexion');

let event_id = 0;

const getEvents = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM events ORDER BY event_id ASC'
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getEventId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM events WHERE event_id = (?)', [id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Event not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createEvent = async (req, res) => {
    try {
        const { event_name, sport, description, wins, losses } = req.body;
        const [result] = await pool.query(
            'INSERT INTO events (user_id, event_name, sport, description, wins, losses) VALUES (?, ?, ?, ?, ? ,?)', [
            4, //user_id
            event_name,
            sport,
            description,
            wins,
            losses
        ]);
        res.status(200).json({ message: "Event created succecsfully" })
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
    getEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent
};