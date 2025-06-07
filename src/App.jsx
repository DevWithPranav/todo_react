import "./App.css";
import Totdo from "../components/totdo";
import { useEffect, useState } from "react";
import {
  readData,
  addData,
  toggleCompletion,
  deleteData,
  updateData,
} from "../functions/function";

function App() {
  const [isPopUped, setIsPopUped] = useState(false);
  const [data, setData] = useState([]);
  const [action, setAction] = useState("ADD");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClosePopup = () => {
    setIsPopUped(false);
    setSelectedTask(null);
  };

  const handleDelete = async (id) => {
    await deleteData(id);
    const updatedData = await readData();
    setData(updatedData);
  };

  const handleAction = (actionType, task = null) => {
    setAction(actionType);
    setSelectedTask(task);
    setIsPopUped(true);
  };

  const handleToggle = async (id) => {
    await toggleCompletion(id);
    const updatedData = await readData();
    setData(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const taskData = await readData();
      setData(taskData);
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full bg-yellow-200 flex items-center p-12 flex-col">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">TO DO WEB APP</h1>
        <button
          onClick={() => handleAction("ADD")}
          className="text-md bg-black p-2 text-white px-4 rounded"
        >
          ADD
        </button>
      </div>

      <Totdo
        isPopUped={isPopUped}
        Action={action}
        onClose={handleClosePopup}
        onAdd={async (taskText) => {
          await addData({ task: taskText, completed: false });
          const updatedData = await readData();
          setData(updatedData);
          handleClosePopup();
        }}
        onEdit={async (updatedText) => {
          if (selectedTask) {
            await updateData(selectedTask.id, updatedText);
            const updatedData = await readData();
            setData(updatedData);
            handleClosePopup();
          }
        }}
        initialValue={selectedTask?.task || ""}
      />

      <div className="w-full mt-10">
        <ul className="space-y-4">
          {data.length > 0 ? (
            data.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center">
                  <input
                    onChange={() => handleToggle(task.id)}
                    type="checkbox"
                    id={task.id}
                    checked={task.completed}
                    className="h-5 w-5 mr-3 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-black checked:border-black checked:[&::after]:content-['✔'] checked:[&::after]:text-white checked:[&::after]:text-xs checked:[&::after]:flex checked:[&::after]:items-center checked:[&::after]:justify-center checked:[&::after]:w-full checked:[&::after]:h-full"
                  />
                  <label
                    htmlFor={task.id}
                    className={`text-lg ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-black"
                    }`}
                  >
                    {task.task}
                  </label>
                </div>
                <div>
                  <button
                    onClick={() => handleAction("EDIT", task)}
                    className="px-4 py-1 bg-blue-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No tasks available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
