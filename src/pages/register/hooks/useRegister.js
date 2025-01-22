import { useState } from "react";
import { useValidateFieldErrors } from "../../../hooks/validate-field-errors";
import registerServices from "./register.services";
import resetInputs from "../../../utils/reset-inputs";
import { useNavigate } from "react-router";

const INITIAL_STATE_REGISTER = {
  username: "",
  email: "",
  password: "",
};

export function useRegister() {
  const [dataRegister, setDataRegister] = useState(INITIAL_STATE_REGISTER);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [errorRegister, setErrorRegister] = useState({
    error: null,
    isError: false,
  });
  const [fieldErrorsRegister, setFieldErrorsRegister] = useState(
    INITIAL_STATE_REGISTER
  );
  const { validateField, validateForm } = useValidateFieldErrors();
  const navigate = useNavigate();

  function onChangeInputRegister(event) {
    const { name, value } = event.target;
    setDataRegister((prevState) => ({ ...prevState, [name]: value }));
    validateField(name, value, setFieldErrorsRegister);
  }

  function validateErrorRegister() {
    return errorRegister.error ?? "Ops não foi possível fazer o cadastro!";
  }

  async function handlerRegister(event) {
    event.preventDefault();
    setLoadingRegister(true);

    if (validateForm(dataRegister, setFieldErrorsRegister)) {
      setLoadingRegister(false);
      return;
    }

    try {
      await registerServices.signUp(dataRegister);
      setDataRegister(resetInputs);
      setFieldErrorsRegister(resetInputs);
      navigate("/admin", { replace: true });
    } catch (error) {
      setErrorRegister({
        error: error.message,
        isError: true,
      });
      setLoadingRegister(false);
    } finally {
      setLoadingRegister(false);
    }
  }

  return {
    errorRegister,
    loadingRegister,
    dataRegister,
    fieldErrorsRegister,
    onChangeInputRegister,
    handlerRegister,
    validateErrorRegister: validateErrorRegister(),
  };
}
