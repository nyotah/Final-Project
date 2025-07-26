import { useState } from "react";
import type { TaskItemProps } from "./types";

// getting props passed from parent (TaskList)
export default function TaskItem({
  task,
  taskIndex,
  listId,
  onUpdate, //prop function to update aka edit an existing task
  onDeleteTask, // prop func to delete a task from the list
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false); // track if we're editing
  const [editedTask, setEditedTask] = useState(task); // start with original task text

  const handleUpdate = () => {
    // first grab the full list from api by id
    fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists/${listId}`)
      .then((res) => res.json())
      .then((data) => {
        // update just one task in that list (by index)
        const updatedTodos = [...data.todos];
        updatedTodos[taskIndex] = editedTask;

       
        return fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists/${listId}`, {
          method: "PUT", // send updated list back to api using PUT method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, todos: updatedTodos }),
        });
      })
      .then(() => {
        setIsEditing(false); // done editing, no longer true
        onUpdate(); // tell parent to refetch data
      })
      .catch((error) => console.error("Failed to update task:", error));
  };

  return (
    <div className="w-100">
      <div className="border rounded px-3 py-2 bg-white shadow-sm d-flex align-items-center justify-content-between w-100">
        {/* if editing, show form/input field */}
        {isEditing ? (
          <input
            className="form-control me-2"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdate();
            }}
            autoFocus
          />
        ) : (
          // otherwise just show the task text, clickable to edit
          <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
            {task}
          </span>
        )}
        {/* delete button sends task text back up to parent via prop func */}
        <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => onDeleteTask(task)}>
          Delete
        </button>
      </div>
    </div>
  );
}

  