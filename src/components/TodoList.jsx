import TodoItem from "./TodoItem";

function TodoList({ todos, isLoading, deleteTodo, editTodo, editCheck }) {
  return (
    <>
      {isLoading ? (
        <h2 className="loading">Loading...</h2>
      ) : (
        <ul className="todo__list">
          {todos.reduce((acc, todo) => {
            acc.push(
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                status={todo.status}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                editCheck={editCheck}
              />
            );
            return acc;
          }, [])}
        </ul>
      )}
    </>
  );
}

export default TodoList;
