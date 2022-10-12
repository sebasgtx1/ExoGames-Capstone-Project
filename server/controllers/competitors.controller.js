const { pool } = require('./db_conexion');

const getCompetitors = async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT * FROM competitors ORDER BY competitor_id DESC'
        );
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMyCompetitors = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const [result] = await pool.query(
            'SELECT * FROM competitors WHERE user_id = (?) ORDER BY competitor_id DESC', [user_id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "competitor not found" });

        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const getMyCompetitorId = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id);
        const id = parseInt(req.params.id);
        const [result] = await pool.query(
            'SELECT * FROM competitors WHERE (user_id = (?) AND competitor_id = (?))', [user_id, id]
        );
        if (result.length === 0)
            return res.status(404).json({ message: "competitor not found" });

        res.json(result[0]);
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
            return res.status(404).json({ message: "Competitors not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createCompetitor = async (req, res) => {
    try {
        const { name, sport, description, team_players } = req.body;
        const [result] = await pool.query(
            'INSERT INTO competitors (user_id, name, team_players, description, sport) VALUES (?, ?, ?, ?, ?)', [
            4, //user_id
            name,
            team_players,
            description,
            sport
        ]);
        res.status(200).json({ message: "Competitor created succecsfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateCompetitor = async (req, res) => {

    try {
        const [result] = await pool.query(
            'UPDATE competitors SET ? WHERE competitor_id = (?)', [
            req.body,
            req.params.id
        ]);
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteCompetitor = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM competitors where competitor_id = (?)', [
            req.params.id
        ]);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Competitor not found" });

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCompetitors,
    getCompetitorId,
    getMyCompetitorId,
    getMyCompetitors,
    createCompetitor,
    updateCompetitor,
    deleteCompetitor
};