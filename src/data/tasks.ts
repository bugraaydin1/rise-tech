import { Task } from "./models/TaskModel";

export const initialTasks: Task[] = [
  { id: 1, name: "DOM manipulation", priority: "Urgent" },
  { id: 2, name: "Storage of data", priority: "Regular" },
  { id: 3, name: "Manipulation of data", priority: "Trivial" },
  { id: 4, name: "Retrieval of data from storage", priority: "Urgent" },
  { id: 5, name: "UI/UX", priority: "Regular" },
  { id: 6, name: "Global state management", priority: "Regular" },
  { id: 7, name: "Node.js API", priority: "Urgent" },
  { id: 8, name: "Code styling & linter", priority: "Trivial" },
  { id: 9, name: "Unit/Integration tests", priority: "Regular" },
];
