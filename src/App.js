import { useState } from "react";
import { Container, InputGroup, Form, FormControl, Button, ListGroup } from "react-bootstrap";

const TODO_STATE = {
  completed: "completed",
  nonCompleted: "nonCompleted",
};

const TARGET_DATE = {
  asSoonAsPossible: "なるはや",
  untilToday: "今日中",
  untilTomorrow: "明日まで",
  untilDayAfterTomorrow: "明後日まで",
};

function App() {
  const [todoContent, setTodoContent] = useState("");

  const [todos, setTodos] = useState([
    { state: TODO_STATE.completed, content: "風呂掃除", targetDate: TARGET_DATE.asSoonAsPossible },
    { state: TODO_STATE.nonCompleted, content: "資料作成", targetDate: TARGET_DATE.untilToday },
  ]);

  // 関数の定義
  const addTodo = () => {
    setTodos([
      ...todos,
      {
        state: TODO_STATE.completed,
        content: todoContent,
      },
    ]);
  };

  const changeTodoContent = (event) => {
    event.preventDefault();
    setTodoContent(event.target.value);
  };

  const changeTodoContentSpecific = ({ event, targetIdx }) => {
    event.preventDefault();
    const todosUpdated = todos.map((todo, idx) => {
      if (idx !== targetIdx) return todo;
      todo.content = event.target.value;
      return todo;
    });
    setTodos(todosUpdated);
  };

  const changeTodoTargetDateSpecific = ({ event, targetIdx }) => {
    event.preventDefault();
    const todosUpdated = todos.map((todo, idx) => {
      if (idx !== targetIdx) return todo;
      todo.targetDate = event.target.value;
      return todo;
    });
    setTodos(todosUpdated);
  };

  const removeTodo = ({ idxTarget }) => {
    const filtered = todos.filter((todo, idx) => {
      return idx !== idxTarget;
    });

    setTodos(filtered);
  };

  // domの定義

  // 「いつまでにやるか」選択肢の定義
  const $targetDateSelects = Object.values(TARGET_DATE).map((targetDate) => {
    return (
      <option key={targetDate} value={targetDate}>
        {targetDate}
      </option>
    );
  });

  // todoリスト中身の定義
  const $todos = todos.map((todo, idx) => {
    return (
      <ListGroup.Item key={idx} className="todo">
        <FormControl
          value={todo.content}
          placeholder="やること"
          onChange={(event) => {
            changeTodoContentSpecific({ event, targetIdx: idx });
          }}
        />
        <Form.Control
          className="col-3"
          as="select"
          custom
          defaultValue={todo.targetDate}
          onChange={(event, idx) => {
            changeTodoTargetDateSpecific({ event, targetIdx: idx });
          }}
        >
          {$targetDateSelects}
        </Form.Control>
        <Button
          variant="outline-secondary"
          onClick={() => {
            removeTodo({ idxTarget: idx });
          }}
        >
          X
        </Button>
      </ListGroup.Item>
    );
  });

  return (
    <Container className="pt-2">
      <p>「やること」と「いつまでにやるか？」を入力する</p>
      <InputGroup className="mb-3">
        <FormControl placeholder="やること" onChange={changeTodoContent} />
        <Form.Control className="col-3" as="select" custom>
          {$targetDateSelects}
        </Form.Control>
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={addTodo}>
            追加
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <ListGroup>{$todos}</ListGroup>
    </Container>
  );
}

export default App;
