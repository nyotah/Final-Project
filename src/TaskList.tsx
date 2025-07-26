import type { TaskListProps } from "./types";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

// props coming from App
export default function TaskList({
  todos,
  openedTask, //receiving opened task data from app parent
  onAddTask,
  todoLists,
  setOpenedTask,
}: TaskListProps) {
  const handleDeleteTask = async (taskToDelete: string) => {
    if (!openedTask) return; // skip if no list selected

    try {
      // get the current list data by name
      const res = await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists?name=${openedTask}`);
      const data = await res.json();
      if (data.length === 0) return;

      // remove the task from the list's todos
      const list = data[0];
      const updatedTodos = list.todos.filter((t: string) => t !== taskToDelete); //uses .filter to delete items the API array

      // update the list 
      await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists/${list.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...list, todos: updatedTodos }),
      });

      onAddTask(); // refresh tasks from parent
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="d-flex flex-column gap-2 w-100 p-5">
      {openedTask && (
        <div style={{ marginTop: ".2rem" }}>
          <h2>{openedTask}</h2> {/* show which list is open and display list title */}
          <button
            className="btn btn-outline-secondary btn-sm mt-2 mb-4"
            onClick={() => setOpenedTask(null)} // go back home
          >
            ← Return to Home 
          </button>
        </div>
      )}

      {openedTask &&
        todos[openedTask]?.todos.map((task, index) => { //maps through tasks and renders task items
          // grab the full list obj so we can get id
          const matchingList = todoLists.find((list) => list.name === openedTask);
          return (
            <TaskItem //returns taskitem component
              key={task}
              task={task}
              taskIndex={index}
              listId={matchingList?.id || ""} // pass list id down
              onDeleteTask={handleDeleteTask}
              onUpdate={onAddTask} // refresh when task is edited
            />
          );
        })}

      <CreateTask openedTask={openedTask} onAddTask={onAddTask} /> {/* add task to current list */} 
    </div>
  );
}
