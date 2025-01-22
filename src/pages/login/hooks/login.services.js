import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../services/firebase";

const storageUerAuthKey = "@userAuthFireApp";

const loginServices = {
  signIn: async ({ email, password }) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseApp.auth(),
        email,
        password
      );
      const token = await user.getIdToken();

      const userAuth = {
        id: user.uid,
        username: user?.displayName ?? "",
        email: user?.email ?? "",
        accessToken: token,
      };

      localStorage.setItem(storageUerAuthKey, JSON.stringify(userAuth));
      alert("Usuário " + userAuth.username + " autenticado!");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default loginServices;
