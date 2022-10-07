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
            return res.status(404).json({ message: "Competitors not found" });

        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};

const createCompetitor = async (req, res) => {
    try {
        const { description, sport, wins, losses } = req.body;
        const [result] = await pool.query(
            'INSERT INTO competitors (competitor_id, description, sport, wins, losses) VALUES (?, ?, ?, ?, ?)', [
            4, //competitor_id
            description,
            sport,
            wins,
            losses
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
    createCompetitor,
    updateCompetitor,
    deleteCompetitor
};