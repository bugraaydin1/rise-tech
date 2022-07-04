import store from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "./theme";
import AppBar from "./components/AppBar";
import TaskList from "./components/TaskList";
import "./styles/App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <AppBar />
        <TaskList />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
