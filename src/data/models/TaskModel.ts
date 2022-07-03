export interface Task {
  id?: number;
  name: string;
  priority: Priority | string;
}

export type Priority = "Urgent" | "Regular" | "Trivial";
