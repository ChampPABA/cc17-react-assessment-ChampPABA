import { useState } from "react";

function TodoAdd({ addTodo }) {
  const [newTitle, setNewTitle] = useState("");

  return (
    <>
      <input
        className="input__add"
        placeholder="new task"
        onChange={(event) => setNewTitle(event.target.value)}
        value={newTitle}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTodo(newTitle);
            setNewTitle("");
          }
        }}
      />
    </>
  );
}

export default TodoAdd;
