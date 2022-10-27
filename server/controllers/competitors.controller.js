const { Competitors } = require("../models/Competitors.js");

const getCompetitors = async (req, res) => {
  try {
    const result = await Competitors.findAll({
      where: {
        status: "active",
      },
      order: [["competitor_id", "DESC"]],
    });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyCompetitors = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await Competitors.findAll({
      where: {
        user_id: user_id,
        status: "active",
      },
      order: [["competitor_id", "DESC"]],
    });

    if (result.length === 0)
      return res.json({ message: "Competitors not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyCompetitorId = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    const result = await Competitors.findAll({
      where: {
        user_id: user_id,
        competitor_id: id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "competitor not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyCompetitorSport = async (req, res) => {
  try {
    const { sport } = req.params;
    const result = await Competitors.findAll({
      where: {
        sport: sport,
      },
      order: [["competitor_id", "DESC"]],
    });
    if (result.length === 0)
      return res.status(404).json({ message: "competitors not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCompetitorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Competitors.findAll({
      where: {
        competitor_id: id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "Competitors not found" });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCompetitor = async (req, res) => {
  try {
    const result = await Competitors.create({
      ...req.body,
    });
    res.status(200).json({ message: "Competitor created succecsfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCompetitor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Competitors.update(
      {
        ...req.body,
      },
      {
        where: {
          competitor_id: id,
        },
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCompetitor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCompetitor = await Competitors.update(
      {
        status: "inactive",
      },
      {
        where: {
          competitor_id: id,
        },
      }
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCompetitors,
  getCompetitorId,
  getMyCompetitorId,
  getMyCompetitors,
  createCompetitor,
  updateCompetitor,
  deleteCompetitor,
  getMyCompetitorSport,
};
