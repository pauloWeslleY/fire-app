import { useCallback, useEffect, useState } from "react";
import homeServices from "./home.services";
import taskServices from "./task.services";
import { onSnapshot } from "firebase/firestore";

export const FormTypeTask = {
  CREATED: "created",
  UPDATED: "updated",
};

export function useHome() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState({});
  const [formTask, setFormTask] = useState(FormTypeTask.CREATED);
  const [inputTask, setInputTask] = useState("");
  const [loadingTask, setLoadingTask] = useState(false);

  const getTasksAll = useCallback(async () => {
    try {
      const taskQuery = taskServices.taskByUserAuth();
      onSnapshot(taskQuery, (snapshot) => {
        let tasks = [];

        snapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });

        setTasks(tasks);
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    getTasksAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handlerCreateTask(event) {
    event.preventDefault();
    setLoadingTask(true);

    if (!inputTask) {
      setLoadingTask(false);
      return;
    }

    try {
      await taskServices.create(inputTask);
      setInputTask("");
    } catch (e) {
      setLoadingTask(false);
      throw new Error(e.message);
    } finally {
      setLoadingTask(false);
    }
  }

  function onChangeUpdateTask(event) {
    setInputTask(event.target.value);
  }

  async function handlerUpdateTask(event) {
    event.preventDefault();
    setLoadingTask(true);

    const updatedTask = {
      ...editTask,
      task: inputTask,
    };

    try {
      await taskServices.update(updatedTask);
      setInputTask("");
      setFormTask(FormTypeTask.CREATED);
      setEditTask({});
    } catch (error) {
      setLoadingTask(false);
      throw new Error(error.message);
    } finally {
      setLoadingTask(false);
    }
  }

  function handlerEditTask(task) {
    setFormTask(FormTypeTask.UPDATED);
    setEditTask(task);
    setInputTask(task.task);
  }

  async function handlerDeleteTask(id) {
    try {
      await taskServices.delete(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function handlerLogout() {
    try {
      await homeServices.logout();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return {
    tasks,
    formTask,
    inputTask,
    loadingTask,
    handlerLogout,
    handlerCreateTask,
    handlerUpdateTask,
    handlerDeleteTask,
    handlerEditTask,
    onChangeUpdateTask,
  };
}
