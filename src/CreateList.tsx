import { useState } from "react";
import type { CreateListProps } from "./types";

// takes in onCreateList from parent so we can refresh data after add
export default function CreateList({ onCreateList }: CreateListProps) {
  const [listName, setListName] = useState(""); // local state for input box

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim()) return; // don’t post empty strings

    try {
      await fetch("https://6885134c745306380a3a4186.mockapi.io/Lists", {
        method: "POST", //uses POST to create new list
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: listName.trim(), // new list name of users choice
          todos: [], // start with empty tasks that user cna add to
        }),
      });

      setListName(""); // clear input after user is done
      onCreateList(); // tells parent to re-fetch lists
    } catch (err) {
      console.error("Failed to create list:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group border-dark border rounded shadow-sm">
        <input //react form 
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)} 
          className="form-control"
          placeholder="Name"
        />
        <button className="btn btn-warning border-dark border rounded" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
