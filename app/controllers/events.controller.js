const { pool } = require('./db_conexion');

const getEvents = async (req, res) => {
    const response = await pool.query('SELECT * FROM events ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getEventId = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
    res.json(response.rows);
};

const createEvent = async (req, res) => {
    const params = JSON.parse(JSON.stringify(req.body));
    console.log(params);
    const response = await pool.query('INSERT INTO events (id, user_id, event_name, sport, description) VALUES ($1, $2, $3, $4, $5)', [
        267, // DEBE GENERARSE SOLO Y SER UNICO
        123, // ID DEL USUARIO; SE RECIBE POR POST REQUEST
        params.event_name,
        params.sport,
        params.description
    ]);
    res.json({
        message: 'Event Added successfully',
        body: {
            event: {}
        }
    })
};

const updateEvent = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, sport, description } = req.body;

    const response = await pool.query('UPDATE events SET event_name = $1, sport = $2, description = $3 WHERE id = $4', [
        name,
        sport,
        description,
        id
    ]);
    res.json('Event Updated Successfully');
};

const deleteEvent = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM events where id = $1', [
        id
    ]);
    res.json(`Event ${id} deleted Successfully`);
};

module.exports = {
    getEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent
};