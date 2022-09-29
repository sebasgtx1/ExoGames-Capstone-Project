const { Pool } = require('pg');
const uuidv4 = require("uuid/v4");

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '0227',
    database: 'exogames_test', // testing_database
    port: '5432'
});

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
    const { name, sport, description} = req.body;
    const response = await pool.query('INSERT INTO events (id, name, sport, description) VALUES ($1, $2, $3, $4)', [
        uuidv4(),
        name,
        sport,
        description
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

    const response = await pool.query('UPDATE users SET name = $1, sport = $2, description = $3 WHERE id = $3', [
        name,
        sport,
        description
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