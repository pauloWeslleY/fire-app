import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { firebaseApp } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function PrivateRoutes({ children }) {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const auth = firebaseApp.auth();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        setSigned(false);
        return;
      }

      const accessToken = await user.getIdToken();
      setSigned(!!accessToken);
      setLoading(false);
    });
  }, [auth]);

  if (loading) {
    return (
      <div>
        <span>Carregando...</span>
      </div>
    );
  }

  return signed ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/" />
  );
}
