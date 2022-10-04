const { pool } = require('./db_conexion');

let event_id = 0;

const getEvents = async (req, res) => {
    const response = await pool.query('SELECT * FROM events ORDER BY event_id ASC', (err,result, fields) =>{

        res.status(200).json(result);
    });
    
};

const getEventId = async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(req.params);
    const response = await pool.query('SELECT * FROM events WHERE event_id = (?)', [id], (err,result, fields) =>{

        res.json(result);
    });

};

const createEvent = async (req, res) => {
    const params = JSON.parse(JSON.stringify(req.body));
    const response = await pool.query('INSERT INTO events (user_id, event_name, sport, description, wins, losses) VALUES (?, ?, ?, ?, ? ,?)', [
        1, //user_id
        params.event_name,
        params.sport,
        params.description,
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
        res.sendFile('/public/templates/form_updateEvent.html', {
            root: __dirname
        })
        return;

    }
    console.log(event_id);
    const params = JSON.parse(JSON.stringify(req.body));

    const response = await pool.query('UPDATE events SET event_name = (?), sport = (?), description = (?) WHERE event_id = (?)', [
        params.event_name,
        params.sport,
        params.description,
        event_id
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
        
    await pool.query('DELETE FROM events where event_id = (?)', [
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