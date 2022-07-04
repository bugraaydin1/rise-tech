import { Task } from "src/data/models/TaskModel";

export const selectTasks = (state: { task: { tasks: Task[] } }) => {
  return state.task.tasks;
};
