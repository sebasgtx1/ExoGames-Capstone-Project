const { Venues } = require("../models/Venues.js");

const getVenues = async (req, res) => {
  try {
    const venues = await Venues.findAll({
      where: {
        status: "active",
      },
      order: [["venue_id", "DESC"]],
    });
    res.json(venues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyVenues = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await Venues.findAll({
      where: {
        user_id: user_id,
        status: "active",
      },
      order: [["venue_id", "DESC"]],
    });
    if (result.length === 0) return res.json({ message: "Venues not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyVenuesId = async (req, res) => {
  try {
    const { user_id, id } = req.params;
    // const { id } = req.params;
    const result = await Venues.findAll({
      where: {
        user_id: user_id,
        venue_id: id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "venue not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getVenueId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Venues.findAll({
      where: {
        venue_id: id,
      },
    });
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
    const result = await Venues.create({
      user_id,
      name,
      description,
      image,
      status: "active",
    });
    res.status(200).json({ message: "venue created succecsfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Venues.update(
      {
        ...req.body,
      },
      {
        where: {
          venue_id: id,
        },
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await Venues.update(
      {
        status: "inactive",
      },
      {
        where: {
          venue_id: id,
        },
      }
    );
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getVenues,
  getMyVenues,
  getMyVenuesId,
  getVenueId,
  createVenue,
  updateVenue,
  deleteVenue,
};
