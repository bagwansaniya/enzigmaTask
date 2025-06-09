import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Todocontext } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";

function Task() {
  const {
    updated_data,
    handle_delete,
    handle_completed,
    handle_update,

    handleDragEnd,
  } = useContext(Todocontext);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <ul
            className="list-group"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {updated_data.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Task;
