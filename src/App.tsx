import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import TaskList from "./TaskList";
import type { TodoList } from "./types";
import Welcome from "./Welcome";
import Logout from "./Logout";

export default function App() {
  //  state to track which list is opened
  const [openedTask, setOpenedTask] = useState<string | null>(null);
  // storing all todo listss pulled from API
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  // toggles if sidebar is collapsed or not
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // fetches all todos from mock API
  const fetchTodos = () => {
    fetch("https://6885134c745306380a3a4186.mockapi.io/Lists")
      .then((res) => res.json())
      .then((data) => setTodoLists(data)) // updates state w the data
      .catch((error) => console.error("Failed to fetch todos:", error));
  };

  // runs fetch on first load
  useEffect(() => {
    fetchTodos();
  }, []);

  // converting todoLists array into an object so it's easier to access by name
  const todos = todoLists.reduce((acc, list) => {
    acc[list.name] = { todos: list.todos };
    return acc;
  }, {} as Record<string, { todos: string[] }>);

  return (
    <div className="d-flex flex-row" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* sidebar only shows if not collapsed */}
      {!sidebarCollapsed && (
        <div
          className="bg-light border-end p-3 d-none d-sm-flex flex-column min-vh-100"
          style={{ width: "200px" }}
        >
          <Sidebar
            todos={todos} // passing down the todos object as prop
            setOpenedTask={setOpenedTask} // function to open a task list
            onCreateList={fetchTodos} // refetches todoLists after list is added/deleted
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed} // lets sidebar collapse itself
          />
        </div>
      )}

      {/* button to expand sidebar if it's collapsed */}
      {sidebarCollapsed && (
        <div style={{ position: "absolute", top: "1rem", left: "1rem", zIndex: 1000 }}>
          <button
            className="btn btn-warning"
            onClick={() => setSidebarCollapsed(false)}
          >
            Expand Sidebar
          </button>
        </div>
      )}

      {/* main content area */}
      <div
        className="bg-light d-flex flex-column flex-grow-1 overflow-auto"
        style={{ padding: "2rem" }}
      >
        {/* if a list is opened, show TaskList, otherwise show welcome screen */}
        {openedTask ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* header removed from here */}
            </div>

            <TaskList
              todos={todos}
              openedTask={openedTask}
              onAddTask={fetchTodos} // passed down to refresh list after adding/deleting task
              todoLists={todoLists}
              setOpenedTask={setOpenedTask} // lets user go back to home
            />
          </>
        ) : ( //welcome & login used if task list isnt open
          <>
            <Welcome />
            <Logout />
          </>
        )}
      </div>
    </div>
  );
}
