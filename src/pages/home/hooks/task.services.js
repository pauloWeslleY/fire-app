import { firebaseApp } from "../../../services/firebase";
import {
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const taskServices = {
  create: async (task) => {
    const userAuth = firebaseApp.auth().currentUser;

    if (!userAuth) {
      throw new Error("User not authenticated");
    }

    const newTask = {
      task: task,
      author: userAuth.displayName ?? "",
      userId: userAuth.uid,
      createdAt: new Date(),
    };

    try {
      await addDoc(firebaseApp.collection("tasks"), newTask);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  update: async (task) => {
    try {
      const taskRef = doc(firebaseApp.getDB(), "tasks", task.id);
      await updateDoc(taskRef, { task: task.task });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  delete: async (taskId) => {
    try {
      const taskRef = doc(firebaseApp.getDB(), "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  taskByUserAuth: () => {
    const userAuth = firebaseApp.auth().currentUser;

    if (!userAuth) {
      throw new Error("User not authenticated");
    }

    return query(
      firebaseApp.collection("tasks"),
      orderBy("createdAt", "desc"),
      where("userId", "==", userAuth.uid)
    );
  },
};

export default taskServices;
