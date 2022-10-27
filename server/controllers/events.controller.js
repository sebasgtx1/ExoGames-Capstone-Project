const { Events } =  require("../models/Events");

const getEvents = async (req, res) => {
  try {
    const result = await Events.findAll({
      where: {
        public_status: "public",
        status: "active",
      },
      order: [["event_id", "DESC"]],
    });
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await Events.findAll({
      where: {
        user_id: user_id,
        status: "active",
      },
      order: [["event_id", "DESC"]],
    });
    if (result.length === 0) return res.json({ message: "Events not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyEventId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const id = req.params.id;
    const result = await Events.findAll({
      where: {
        user_id: user_id,
        event_id: id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "Event not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getEventId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Events.findAll({
      where: {
        event_id: id,
      },
    });
    if (result.length === 0)
      return res.status(404).json({ message: "Event not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const result = await Events.create(
      {
        ...req.body,
      },
    );
    res.json({
      event_id: result.event_id,
      event_name: req.body.event_name,
      sport: req.body.sport,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const result = await Events.update(
      {
        ...req.body,
      },
      {
        where: {
          event_id: req.params.id,
        },
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await Events.update(
      {
        status: "inactive",
      },
      {
        where: {
          event_id: req.params.id,
        },
      }
    );

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const un_PublishEvent = async (req, res) => {
  try {
    const { public_status } = req.body;
    const result = await Events.update(
      {
        public_status,
      },
      {
        where: {
          event_id: req.params.id,
        },
      }
    );
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getMyEventId,
  getMyEvents,
  getEventId,
  createEvent,
  updateEvent,
  deleteEvent,
  un_PublishEvent,
};
