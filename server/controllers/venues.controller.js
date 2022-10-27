const { pool } = require('./db_conexion');


const getVenues = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM venues WHERE status = (?) ORDER BY venue_id DESC', ['active']
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMyVenues= async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const [result] = await pool.query(
            'SELECT * FROM venues WHERE (user_id = (?) AND status = (?)) ORDER BY venue_id DESC', [user_id, 'active']
        );
        if (result.length === 0)
            return res.json({ message: "Venues not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};
const getMyVenuesId= async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const id = parseInt(req.params.id);
        
        const [result] = await pool.query(
            'SELECT * FROM venues WHERE (user_id = (?) and venue_id = (?))', [user_id, id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "venue not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};


const getVenueId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM venues WHERE venue_id = (?)', [id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "venue not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createVenue = async (req, res) => {
    try {
        const { user_id, name, description, image } = req.body;
        const [result] = await pool.query(
            'INSERT INTO venues (user_id, name, description, image, status) VALUES (?, ?, ?, ?, ?)', [
            user_id,
            name,
            description,
            image,
            'active'
        ]);
        res.status(200).json({ message: "venue created succecsfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateVenue = async (req, res) => {

    try {
        const [result] = await pool.query(
            'UPDATE venues SET ? WHERE venue_id = (?)', [
            req.body,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteVenue = async (req, res) => {
    try {
        const [result] = await pool.query(
            'UPDATE venues SET status = (?) WHERE venue_id = (?)', [
                'inactive',
                req.params.id
            ]
        );


        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getVenues,
    getMyVenues,
    getMyVenuesId,
    getVenueId,
    createVenue,
    updateVenue,
    deleteVenue
};