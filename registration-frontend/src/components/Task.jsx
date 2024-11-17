import { useContext } from "react";
import { Todocontext } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";

function Task() {
  const { updated_data, handle_delete, handle_completed, handle_update } =
    useContext(Todocontext);

  return (
    <>
      <ul className="list-group">
        {updated_data.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              {task.task}
            </span>
            <div>
              <button
                className={`btn ${
                  task.completed ? "btn-warning" : "btn-success"
                } me-2`}
                onClick={() => handle_completed(task)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={() => handle_delete(task.id)}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handle_update(task)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Task;
