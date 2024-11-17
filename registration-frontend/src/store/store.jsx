import { createContext, useReducer, useRef, useEffect, useState } from "react";
import axios from "axios";

export const Todocontext = createContext();

const reducer_func = (current_value, action) => {
  let updated_value = current_value;
  switch (action.type) {
    case "set_tasks":
      updated_value = action.payload;
      break;
    case "delete":
      updated_value = updated_value.filter(
        (item) => item.id !== action.payload
      );
      break;
    case "add":
      updated_value = [...current_value, action.payload];
      break;
    case "search":
      return action.payload; // Update state with filtered tasks from backend
      break;
    case "completed":
      updated_value = updated_value.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: action.payload.completed }
          : task
      );
      break;
    case "update":
      updated_value = updated_value.map((item) =>
        item.id === action.payload.id
          ? { ...item, task: action.payload.task }
          : item
      );
      break;
    default:
      return updated_value;
  }

  return updated_value;
};

function StoreFunctionlity({ children }) {
  const [updated_data, dispatch] = useReducer(reducer_func, []);
  const inputref = useRef();
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8625/tasks")
      .then((response) => {
        dispatch({
          type: "set_tasks",
          payload: response.data,
        });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handle_delete = (id) => {
    axios
      .delete(`http://localhost:8625/tasks/${id}`)
      .then(() => {
        dispatch({
          type: "delete",
          payload: id,
        });
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handle_add = (task) => {
    axios
      .post("http://localhost:8625/tasks", { task })
      .then((response) => {
        const newTask = {
          id: response.data.taskId,
          task,
          completed: false,
        };
        dispatch({
          type: "add",
          payload: newTask,
        });
        inputref.current.value = "";
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handle_search = (task) => {
    axios
      .get(`http://localhost:8625/tasks/search/${task}`)
      .then((response) => {
        dispatch({
          type: "search",
          payload: response.data,
        });
      })
      .catch((error) => console.error("Error searching tasks:", error));
  };

  const handle_completed = (task) => {
    axios
      .put(`http://localhost:8625/tasks/completed/${task.id}`, {
        completed: !task.completed,
      })
      .then(() => {
        dispatch({
          type: "completed",
          payload: { id: task.id, completed: !task.completed },
        });
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const handle_update = (task) => {
    inputref.current.value = task.task;
    setCurrentTaskId(task.id);
  };

  const handle_input_update = () => {
    const updatedTaskText = inputref.current.value.trim();

    if (!updatedTaskText || currentTaskId === null) {
      console.error("Task input is empty or no task selected for update");
      return;
    }

    axios
      .put(`http://localhost:8625/tasks/${currentTaskId}`, {
        task: updatedTaskText,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "update",
            payload: { id: currentTaskId, task: updatedTaskText },
          });
          inputref.current.value = ""; // Clear the input field
          setCurrentTaskId(null); // Reset the current task ID
        } else {
          console.error("Error: Unexpected response status", response.status);
        }
      })
      .catch((error) => console.error("Error updating task:", error));
  };
  const completed_task = updated_data.filter((task) => task.completed);
  const pending_task = updated_data.filter((task) => !task.completed);

  return (
    <Todocontext.Provider
      value={{
        updated_data,
        handle_update,
        handle_delete,
        handle_add,
        handle_search,
        handle_completed,
        inputref,
        completed_task,
        pending_task,
        handle_input_update,
      }}
    >
      {children}
    </Todocontext.Provider>
  );
}

export default StoreFunctionlity;
