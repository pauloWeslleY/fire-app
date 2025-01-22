import { Button } from "../../components/button/button";
import { FormTypeTask, useHome } from "./hooks/useHome";
import "./home.css";

export default function Home() {
  const {
    tasks,
    formTask,
    inputTask,
    loadingTask,
    handlerLogout,
    handlerCreateTask,
    handlerDeleteTask,
    handlerUpdateTask,
    handlerEditTask,
    onChangeUpdateTask,
  } = useHome();

  const FormTask = {
    [FormTypeTask.CREATED]: (
      <form onSubmit={handlerCreateTask} className="formTaskContainer">
        <div className="formControl">
          <textarea
            value={inputTask}
            onChange={onChangeUpdateTask}
            name="task"
            placeholder="Digite sua tarefa"
            rows={5}
          />
        </div>

        <Button
          type="submit"
          label="Registrar tarefa"
          className="buttonTask"
          isLoading={loadingTask}
        />
      </form>
    ),
    [FormTypeTask.UPDATED]: (
      <form onSubmit={handlerUpdateTask} className="formTaskContainer">
        <div className="formControl">
          <textarea
            value={inputTask}
            onChange={onChangeUpdateTask}
            placeholder="Digite sua tarefa"
            rows={5}
          />
        </div>

        <Button
          type="submit"
          label="Atualizar tarefa"
          className="buttonTask"
          isLoading={loadingTask}
        />
      </form>
    ),
  };

  return (
    <div className="taskAdminContainer">
      <h2>Minhas tarefas</h2>

      {FormTask[formTask]}

      <div className="taskWrapper">
        {tasks.map((task) => {
          return (
            <article key={task.id} className="task">
              <p>{task.task}</p>

              <div className="taskActions">
                <button
                  type="button"
                  onClick={() => handlerEditTask(task)}
                  className="buttonTaskActions buttonTaskUpdate"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handlerDeleteTask(task.id)}
                  className="buttonTaskActions buttonTaskDelete"
                >
                  Concluir
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <button
        onClick={handlerLogout}
        className="buttonTaskActions buttonLogout"
      >
        Sair
      </button>
    </div>
  );
}
