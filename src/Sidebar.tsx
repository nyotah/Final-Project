import CreateList from "./CreateList";
import MyLists from "./MyLists";
import type { SidebarProps } from "./types";

// props coming from parent (App)
export default function Sidebar({
  todos,
  setOpenedTask,
  onCreateList,
  setSidebarCollapsed,
}: SidebarProps) {
  const handleDeleteList = async (listName: string) => {
    try {
      // get list obj by name
      const res = await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists?name=${listName}`);
      const data = await res.json();
      if (data.length === 0) return;

      // delete it using the list's id
      const list = data[0];
      await fetch(`https://6885134c745306380a3a4186.mockapi.io/Lists/${list.id}`, {
        method: "DELETE",
      });

      onCreateList(); // call back to parent to refresh state
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  };

  return (
    <div className="d-flex flex-column h-100 justify-between">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">To-Do App</h5>
          <CreateList onCreateList={onCreateList} /> {/* send prop to child */}
        </div>
      </div>

      <div className="card flex-grow-1">
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-muted mb-2">My Lists</h6>
          {/* loop through all todo list names and render each one */}
          {Object.keys(todos).map((todo) => (
            <MyLists
              key={todo}
              todoName={todo}
              setOpenedTask={setOpenedTask} // callback to open a list
              onDeleteList={handleDeleteList} // send delete func down
            />
          ))}
        </div>
      </div>

      {/* button to hide sidebar, updates state in parent */}
      <button
        className="btn btn-warning mt-2"
        onClick={() => setSidebarCollapsed(true)}
      >
        Minimize Sidebar
      </button>
    </div>
  );
}

