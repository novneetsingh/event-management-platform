import { useState } from "react";
import { Trash2, UserPlus } from "lucide-react";
import EventModal from "../modals/EventModal";

const EventCard = ({ event, handleDelete, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoin = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white overflow-hidden shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {event.title}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {event.description}
          </p>
          <div className="flex flex-col mt-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Date:</span>{" "}
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Venue:</span> {event.venue}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Created by:</span>{" "}
              {event.createdBy.name}
            </p>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-6 flex justify-between border-t border-gray-200">
          {type === "my" ? (
            <button
              onClick={() => handleDelete(event._id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Join Event
            </button>
          )}
        </div>
      </div>
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventCard;
