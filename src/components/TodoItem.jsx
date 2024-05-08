import { useState } from "react";

function TodoItem({ id, title, status, deleteTodo, editTodo }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [checked, setChecked] = useState(status);
  console.log(checked);
  return (
    <li>
      <div className="li-container">
        <input
          type="checkbox"
          id={id}
          name={id}
          value={id}
          defaultChecked={status}
          onChange={() => {
            editTodo(id, !checked, editTitle);
            setChecked(!status);
          }}
        />
        {isEdit ? (
          <input
            onChange={(event) => setEditTitle(event.target.value)}
            value={editTitle}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (editTitle !== title) {
                  editTodo(id, checked, editTitle);
                }
                setIsEdit(false);
              }
            }}
          />
        ) : (
          <label onClick={() => setIsEdit(true)}>{title}</label>
        )}
      </div>
      <button onClick={() => deleteTodo(id)}>x</button>
    </li>
  );
}

export default TodoItem;
