const { pool } = require('./db_conexion');

let event_id;

const getEvents = async (req, res) => {
    const response = await pool.query('SELECT * FROM events CROSS JOIN rules WHERE events.id = rules.event_id ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getEventId = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(req.params);
    const response = await pool.query('SELECT * FROM events INNER JOIN rules ON events.id = rules.event_id WHERE id = $1', [id]);

    res.json(response.rows);
};

const createEvent = async (req, res) => {
    const params = JSON.parse(JSON.stringify(req.body));
    event_id = Math.round(Math.random() * 100000000);
    console.log(event_id);
    const response = await pool.query('INSERT INTO events (id, user_id, event_name, sport, description) VALUES ($1, $2, $3, $4, $5)', [
        event_id, // DEBE GENERARSE SOLO Y SER UNICO
        123, // ID DEL USUARIO; SE RECIBE POR POST REQUEST
        params.event_name,
        params.sport,
        params.description
    ]);

    const response_2 = await pool.query('INSERT INTO rules (event_id, wins, losses) VALUES ($1, $2, $3)', [
        event_id,
        params.wins,
        params.losses
    ]);
    res.json({
        message: 'Event Added successfully'
    })
};

const updateEvent = async (req, res) => {
    if (req.method === 'GET') {
        event_id = req.params.id;
        console.log(event_id);
        res.sendFile('/public/templates/form_updateEvent.html', {
            root: __dirname
        })
        return;

    }
    console.log(event_id);
    const params = JSON.parse(JSON.stringify(req.body));

    const response = await pool.query('UPDATE events SET event_name = $1, sport = $2, description = $3 WHERE id = $4', [
        params.event_name,
        params.sport,
        params.description,
        event_id
    ]);

    const response_2 = await pool.query('UPDATE rules SET wins = $2, losses = $3 WHERE event_id = $1', [
        event_id,
        params.wins,
        params.losses
    ]);
    res.json({
        message: 'Event Updated successfully'
    })
};

const deleteEvent = async (req, res) => {
    if (req.method === 'GET') {
        event_id = req.params.id;
        console.log(event_id);
        res.sendFile('/public/templates/form_deleteEvent.html', {
            root: __dirname
        })
        return;
        }
        
    await pool.query('DELETE FROM events where id = $1', [
        event_id
    ]);
    res.json(`Event ${event_id} deleted Successfully`);
}

module.exports = {
    getEvents,
    getEventId,
    createEvent,
    updateEvent,
    deleteEvent
};