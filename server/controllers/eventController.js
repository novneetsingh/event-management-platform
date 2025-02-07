const User = require("../models/User");
const Event = require("../models/Event");

// create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;

    if (!title || !description || !date || !venue) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      createdBy: req.user.id,
    });

    // add the event to the user's createdEvents array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdEvents: event._id },
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy");
    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all events created by the current user
exports.getMyEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "createdEvents",
      populate: {
        path: "createdBy",
      },
    });
    res.status(200).json({
      message: "Events fetched successfully",
      events: user.createdEvents,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const user = await User.findById(req.user.id);

    // if current user is not the creator of the event, return error
    if (!user.createdEvents.includes(eventId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this event" });
    }

    // remove the event from the user's createdEvents array
    user.createdEvents.pull(eventId);
    await user.save();

    // delete the event
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
