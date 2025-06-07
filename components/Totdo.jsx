import React, { useEffect, useState } from "react";

const Totdo = ({ isPopUped, Action, onClose, onAdd, onEdit, initialValue }) => {
  const [task, setTask] = useState(initialValue);

  useEffect(() => {
    setTask(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (Action === "EDIT") {
      onEdit(task);
    } else {
      onAdd(task);
    }

    setTask("");
  };

  return (
    <div
      className={`${
        isPopUped ? "flex" : "hidden"
      } fixed inset-0 bg-black bg-opacity-40 z-50 items-center justify-center`}
    >
      <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter task"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {Action}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Totdo;
