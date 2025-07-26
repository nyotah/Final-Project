import { useState } from "react";
import type { CreateTaskProps } from "./types";

// gets openedTask and onAddTask from parent as props
export default function CreateTask({ openedTask, onAddTask }: CreateTaskProps) {
  const [taskInput, setTaskInput] = useState(""); //  state for input box

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput || !openedTask) return; // skip if no input or list selected

    try {
      // grab the list from the api using its name
      const res = await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists?name=${openedTask}`);
      const data = await res.json();
      if (data.length === 0) return;

      const list = data[0];
      const updatedTodos = [...list.todos, taskInput]; // add new task to end

      // update the list on the server w/ new task
      await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists/${list.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...list, todos: updatedTodos }),
      });

      setTaskInput(""); // clear box
      onAddTask(); // refetch data in parent

    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mt-3">
      <input
        className="form-control"
        type="text"
        placeholder="Add a new task"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)} // update local state on type
      />
      <button className="btn btn-warning border-dark border rounded px-3 py-2 shadow-sm" type="submit">
        Add
      </button>
    </form>
  );
}
