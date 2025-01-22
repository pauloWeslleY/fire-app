import { Link } from "react-router";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { useRegister } from "./hooks/useRegister";
import "./register.css";

export default function Register() {
  const {
    loadingRegister,
    dataRegister,
    errorRegister,
    fieldErrorsRegister,
    handlerRegister,
    onChangeInputRegister,
    validateErrorRegister,
  } = useRegister();

  return (
    <div className="registerContainer">
      <h2>Cadastrar</h2>

      <form onSubmit={handlerRegister} className="formRegisterContainer">
        <Input
          name="username"
          type="text"
          value={dataRegister.username}
          onChange={(e) => onChangeInputRegister(e)}
          placeholder="Digite seu usuário"
          errors={!!fieldErrorsRegister.username}
          helperText={fieldErrorsRegister.username}
        />
        <Input
          name="email"
          type="email"
          value={dataRegister.email}
          onChange={(e) => onChangeInputRegister(e)}
          placeholder="Digite seu e-mail"
          errors={!!fieldErrorsRegister.email}
          helperText={fieldErrorsRegister.email}
        />
        <Input
          name="password"
          type="password"
          value={dataRegister.password}
          onChange={(e) => onChangeInputRegister(e)}
          placeholder="Digite sua senha"
          errors={!!fieldErrorsRegister.password}
          helperText={fieldErrorsRegister.password}
        />

        <Button type="submit" label="Cadastrar" isLoading={loadingRegister} />

        {errorRegister.isError && (
          <div className="formRegisterAlert">
            <span>{validateErrorRegister}</span>
          </div>
        )}
      </form>

      <div className="registerContainerFooter">
        <span>
          Já possui um cadastro? <Link to="/">Faça o login</Link>
        </span>
      </div>
    </div>
  );
}
