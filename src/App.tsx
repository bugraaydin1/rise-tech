import { ThemeProvider } from "@emotion/react";
import { mainTheme } from "./theme";
import AppBar from "./components/AppBar";
import TaskList from "./components/TaskList";
import { initialRows } from "./data/tasks";
import "./styles/App.css";

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar />
      <TaskList initialRows={initialRows} />
    </ThemeProvider>
  );
}

export default App;
