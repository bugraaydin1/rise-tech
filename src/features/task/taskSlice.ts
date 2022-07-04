import { createSlice } from "@reduxjs/toolkit";
import { Task } from "src/data/models/TaskModel";
import { initialTasks } from "../../data/tasks";

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: initialTasks,
  },
  reducers: {
    addTask: (state, action: { payload: { task: Task } }) => {
      const nextId =
        state.tasks.reduce((pre, { id: curId }, idx) => {
          return Math.max(pre, curId ?? 0);
        }, 0) + 1;

      state.tasks = [...state.tasks, { ...action.payload.task, id: nextId }];
    },
    editTask: (state, action: { payload: { task: Task; id: number } }) => {
      state.tasks = state.tasks.map((row: Task) => {
        if (row.id === action.payload.id) return action.payload.task;
        else return row;
      });
    },
    removeTask: (state, action: { payload: { id: number } }) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },
  },
});

export const { addTask, removeTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
