import css from "./App.module.css";
import Container from "./container/container";

const App = () => {
  return (
    <Container>
      <h1 className={css.title}>Hello world!</h1>
    </Container>
  );
};

export default App;
