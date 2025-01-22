import { Link } from "react-router";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { useLogin } from "./hooks/useLogin";
import "./login.css";

export default function Login() {
  const {
    dataLogin,
    loadingLogin,
    errorLogin,
    fieldErrorsLogin,
    handlerLogin,
    onChangeInput,
    validateErrorLogin,
  } = useLogin();

  return (
    <div className="loginContainer">
      <h2>Login</h2>

      <form onSubmit={handlerLogin} className="formLoginContainer">
        <Input
          name="email"
          type="email"
          value={dataLogin.email}
          onChange={(e) => onChangeInput(e)}
          placeholder="Digite seu e-mail"
          errors={!!fieldErrorsLogin.email}
          helperText={fieldErrorsLogin.email}
        />
        <Input
          name="password"
          type="password"
          value={dataLogin.password}
          onChange={(e) => onChangeInput(e)}
          placeholder="Digite sua senha"
          errors={!!fieldErrorsLogin.password}
          helperText={fieldErrorsLogin.password}
        />

        <Button type="submit" label="Entrar" isLoading={loadingLogin} />

        {errorLogin.isError && (
          <div className="formLoginAlert">
            <span>{validateErrorLogin}</span>
          </div>
        )}
      </form>

      <div className="loginContainerFooter">
        <span>
          Ainda não possui um cadastro? <Link to="/register">Registrar</Link>
        </span>
      </div>
    </div>
  );
}
