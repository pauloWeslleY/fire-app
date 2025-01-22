import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseApp } from "../../../services/firebase";
import { ref, set } from "firebase/database";

const registerServices = {
  signUp: async ({ username, email, password }) => {
    if (!username || !email || !password) {
      throw new Error("Preencha os campos");
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseApp.auth(),
        email,
        password
      );

      const newUser = {
        id: user?.uid,
        username: username,
        email: email,
      };

      await set(ref(firebaseApp.database(), `users/${user.uid}`), newUser);
      await updateProfile(user, { displayName: username });
      console.log("dados cadastrado!");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default registerServices;
