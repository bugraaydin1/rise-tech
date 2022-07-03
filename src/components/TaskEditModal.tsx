import { useEffect, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { Priority, Task } from "src/data/models/TaskModel";
import Modal from "./common/Modal";

interface Props {
  open: boolean;
  isEditMode: boolean;
  editingTask: Task;
  selectedRowId?: number;
  priorities?: Priority[];
  onAccept: (task: Task) => void;
  onCancel: () => void;
}

const TaskEditModal = (props: Props) => {
  const { open, isEditMode, editingTask, priorities, onAccept, onCancel } = props;

  const [task, setTask] = useState<Task>(editingTask);

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleAccept = () => {
    if (!isEditMode && task.name.length && task.name.length < 256 && task.priority) {
      onAccept(task);
    } else if (isEditMode) {
      onAccept(task);
    }
  };

  return (
    <Modal
      open={open}
      acceptButtonTitle="Save"
      dialogTitle="Task Edit"
      onAccept={handleAccept}
      onCancel={onCancel}>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        id="task"
        label="Task"
        value={task.name}
        disabled={isEditMode}
        onChange={evt => setTask({ ...task, name: evt.target.value })}
      />

      <TextField
        select
        fullWidth
        margin="dense"
        id="task-priority"
        label="Task Priority"
        value={task.priority}
        onChange={evt => setTask({ ...task, priority: evt.target.value })}>
        {priorities?.map((option: Priority) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Modal>
  );
};

export default TaskEditModal;
