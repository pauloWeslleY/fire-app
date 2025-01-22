import { useState } from "react";
import { useNavigate } from "react-router";
import { useValidateFieldErrors } from "../../../hooks/validate-field-errors";
import resetInputs from "../../../utils/reset-inputs";
import loginServices from "./login.services";

const INITIAL_STATE_LOGIN = { email: "", password: "" };

export function useLogin() {
  const [dataLogin, setDataLogin] = useState(INITIAL_STATE_LOGIN);
  const [fieldErrorsLogin, setFieldErrorsLogin] = useState(INITIAL_STATE_LOGIN);
  const [errorLogin, setErrorLogin] = useState({ error: null, isError: false });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const { validateField, validateForm } = useValidateFieldErrors();
  const navigate = useNavigate();

  function onChangeInput(event) {
    const { name, value } = event.target;
    setDataLogin((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value, setFieldErrorsLogin);
  }

  function validateErrorLogin() {
    return errorLogin.error ?? "Ops não foi possível fazer o login";
  }

  async function handlerLogin(event) {
    event.preventDefault();
    setLoadingLogin(true);

    if (validateForm(dataLogin, setFieldErrorsLogin)) {
      setLoadingLogin(false);
      return;
    }

    try {
      await loginServices.signIn(dataLogin);
      setFieldErrorsLogin(resetInputs);
      setDataLogin(resetInputs);
      navigate("/admin/home", { replace: true });
    } catch (error) {
      setErrorLogin({
        error: error.message,
        isError: true,
      });
      setLoadingLogin(false);
    } finally {
      setLoadingLogin(false);
    }
  }

  return {
    loadingLogin,
    dataLogin,
    fieldErrorsLogin,
    handlerLogin,
    onChangeInput,
    errorLogin,
    validateErrorLogin: validateErrorLogin(),
  };
}
