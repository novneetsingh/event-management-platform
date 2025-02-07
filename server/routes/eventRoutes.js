const express = require("express");

const router = express.Router();

// Importing auth middleware
const { auth } = require("../middleware/auth");

// Importing controller functions
const {
  createEvent,
  getMyEvents,
  getAllEvents,
  deleteEvent,
} = require("../controllers/eventController");

// Defining routes

// craete an event
router.post("/create", auth, createEvent);

// get my events
router.get("/myevents", auth, getMyEvents);

// get all events
router.get("/allevents", auth, getAllEvents);

// deleting an event
router.delete("/delete/:id", auth, deleteEvent);

module.exports = router;
