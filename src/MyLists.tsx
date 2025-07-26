import type { MyListsProps } from "./types";

// gets name of list, function to open list & function to delete list from props
export default function MyLists({ todoName, setOpenedTask, onDeleteList }: MyListsProps) {
  const handleDelete = () => {
    onDeleteList(todoName); // calls parent delete fnction w/ this list name
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <button
        className="btn btn-warning btn-sm border-dark"
        onClick={() => setOpenedTask(todoName)} // opens the clicked list
      >
        {todoName}
      </button>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={handleDelete} // delete btn triggers handleDelete above
      >
        🗑️
      </button>
    </div>
  );
}
