import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import EventCard from "./EventCard";

const EventList = ({ type }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    // if user is guest
    if (type === "my" && localStorage.getItem("currUserName") === "undefined") {
      toast.error("Please register to view events");
      return;
    }

    try {
      const url =
        type === "my"
          ? `${import.meta.env.VITE_BACKEND_URL}/event/myevents`
          : `${import.meta.env.VITE_BACKEND_URL}/event/allevents`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setEvents(response.data.events);
    } catch (error) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/event/delete/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      fetchEvents();
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          handleDelete={handleDelete}
          type={type}
        />
      ))}
    </div>
  );
};

export default EventList;
