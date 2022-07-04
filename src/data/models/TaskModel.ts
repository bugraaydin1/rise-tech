export interface Task {
  id: number | undefined;
  name: string;
  priority: Priority | string;
}

export type Priority = "Urgent" | "Regular" | "Trivial";
