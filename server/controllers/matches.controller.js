const { Matches } = require("../models/Matches.js");

const getMatchesId = async (req, res) => {
  try {
    const { event_id } = req.params;
    const result = await Matches.findAll({
      where: {
        event_id: event_id,
      },
      order: [["date", "ASC"]],
    });
    if (result.length === 0) return res.json({ message: "Matches not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMatch = async (req, res) => {
  try {
    const { match_id } = req.params;
    const result = await Matches.findAll({
      where: {
        match_id: match_id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "Matches not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createMatch = async (req, res) => {
  try {
    const {event_id} = req.params;
    const {
      competitor1_id,
      competitor2_id,
      venue_id,
      competitor1_group,
      competitor2_group,
      date,
      time,
    } = req.body;
    const result = await Matches.create(
      {
        competitor1_id,
        competitor2_id,
        venue_id,
        event_id,
        competitor1_group,
        competitor2_group,
        date,
        time,
      },
    );
    res.json({
      event_id: event_id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { match_id } = req.params;
    const {
      competitor1_id,
      competitor2_id,
      venue_id,
      competitor1_group,
      competitor2_group,
      date,
      time,
    } = req.body;
    const match = await Matches.findByPk(match_id);
    match.competitor1_id = competitor1_id;
    match.competitor2_id = competitor2_id;
    match.venue_id = venue_id;
    match.competitor1_group = competitor1_group;
    match.competitor2_group = competitor2_group;
    match.date = date;
    match.time = time;
    await match.save();

    res.json(match);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { match_id } = req.params;
    const result = await Matches.destroy({
      where: {
        match_id: match_id,
      },
    });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Match not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMatches = async (req, res) => {
  try {
    const { event_id } = req.params;
    const result = await Matches.destroy({
      where: {
        event_id: event_id,
      },
    });
    if (result.affectedRows === 0)
      return res.json({ message: "Matches not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMatchesId,
  getMatch,
  createMatch,
  updateMatch,
  deleteMatch,
  deleteMatches,
};
