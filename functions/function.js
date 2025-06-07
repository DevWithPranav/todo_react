export const readData = async () => {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
};

export const addData = async (taskObj) => {
  const tasks = await readData();
  taskObj.id = Date.now();
  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const deleteData = async (id) => {
  const tasks = await readData();
  const updated = tasks.filter((t) => t.id !== id);
  localStorage.setItem("tasks", JSON.stringify(updated));
};

export const toggleCompletion = async (id) => {
  const tasks = await readData();
  const updated = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(updated));
};

export const updateData = async (id, updatedTaskText) => {
  const tasks = await readData();
  const updated = tasks.map((t) =>
    t.id === id ? { ...t, task: updatedTaskText } : t
  );
  localStorage.setItem("tasks", JSON.stringify(updated));
};
