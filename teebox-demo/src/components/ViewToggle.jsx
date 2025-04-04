import React from "react";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex bg-black bg-opacity-10 rounded-lg overflow-hidden mb-4">
      <button
        className={`flex-1 py-2 text-sm transition-colors ${
          view === "daily" ? "bg-white bg-opacity-20" : ""
        }`}
        onClick={() => setView("daily")}
      >
        Daily
      </button>
      <button
        className={`flex-1 py-2 text-sm transition-colors ${
          view === "hourly" ? "bg-white bg-opacity-20" : ""
        }`}
        onClick={() => setView("hourly")}
      >
        Hourly
      </button>
      <button
        className={`flex-1 py-2 text-sm transition-colors ${
          view === "details" ? "bg-white bg-opacity-20" : ""
        }`}
        onClick={() => setView("details")}
      >
        Details
      </button>
    </div>
  );
};

export default ViewToggle;
