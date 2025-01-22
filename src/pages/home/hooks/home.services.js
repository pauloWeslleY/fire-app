import { signOut } from "firebase/auth";
import { firebaseApp } from "../../../services/firebase";

const storageUerAuthKey = "@userAuthFireApp";

const homeServices = {
  logout: async () => {
    try {
      await signOut(firebaseApp.auth());
      localStorage.removeItem(storageUerAuthKey);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default homeServices;
