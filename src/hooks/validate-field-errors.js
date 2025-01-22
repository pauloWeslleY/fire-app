import { useCallback } from "react";

const ErrorsMessage = {
  USERNAME: "Informe seu usuário",
  EMAIL: "Informe o e-mail",
  PASSWORD: "Informe sua senha",
};

export function useValidateFieldErrors() {
  const validateForm = useCallback((data, callback) => {
    const errors = {};

    if (Object.keys(data).includes("username")) {
      if (!data.username) {
        errors.username = ErrorsMessage.USERNAME;
      }
    }

    if (!data.email) {
      errors.email = ErrorsMessage.EMAIL;
    }

    if (!data.password) {
      errors.password = ErrorsMessage.PASSWORD;
    }

    if (Object.keys(errors).length > 0) {
      callback(errors);
      return true;
    }

    return false;
  }, []);

  function validateField(field, value, callback) {
    const errors = {
      username: ErrorsMessage.USERNAME,
      email: ErrorsMessage.EMAIL,
      password: ErrorsMessage.PASSWORD,
    };

    callback((prevErrors) => {
      if (value) {
        // eslint-disable-next-line no-unused-vars
        const { [field]: _, ...remainingErrors } = prevErrors;
        return remainingErrors;
      }

      const error = errors[field];
      return prevErrors[field] !== error
        ? { ...prevErrors, [field]: error }
        : prevErrors;
    });
  }

  return {
    validateField,
    validateForm,
  };
}
