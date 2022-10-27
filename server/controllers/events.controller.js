const { pool } = require('./db_conexion');


const getEvents = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM events WHERE (public_status = (?) AND status = (?)) ORDER BY event_id DESC',
            ['public', 'active']
        );

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMyEvents = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const [result] = await pool.query(
            'SELECT * FROM events WHERE (user_id = (?) AND status = (?)) ORDER BY event_id DESC',
            [user_id, 'active']
        );
        if (result.length === 0)
            return res.json({ message: "Events not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMyEventId = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM events WHERE (user_id = (?) AND event_id = (?))', [user_id, id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "Event not found" });

        res.json(result[0]);
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
        const { user_id, event_name, sport, image, description, wins, losses, status, public_status } = req.body;
        const [result] = await pool.query(
            'INSERT INTO events (user_id, event_name, sport, image, description, wins, losses, status, public_status) VALUES (?, ?, ?, ?, ?, ? ,?, ?, ?)', [
            user_id,
            event_name,
            sport,
            image,
            description,
            wins,
            losses,
            status,
            public_status
        ]);
        res.json({
            event_id: result.insertId,
            event_name: event_name,
            sport: sport
        });
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
            'UPDATE events SET status = (?) WHERE event_id = (?)', [
            'inactive',
            req.params.id
        ]);


        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const un_PublishEvent = async (req, res) => {
    try {

        const { public_status } = req.body;
        const [result] = await pool.query(
            'UPDATE events SET public_status = (?) WHERE event_id = (?)', [
            public_status,
            req.params.id
        ]);

        return res.sendStatus(200);


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getEvents,
    getMyEventId,
    getMyEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent,
    un_PublishEvent
};