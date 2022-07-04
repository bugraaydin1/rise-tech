import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPrioritiesQuery } from "../features/task/priorityApiSlice";
import { selectTasks } from "../store/selectors";
import { addTask, editTask, removeTask } from "../features/task/taskSlice";

import { Button, Chip, IconButton, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import { PriorityImportance, PriorityType } from "../data/enum/Priority";
import { Task } from "src/data/models/TaskModel";

import Grid from "./common/Grid";
import TaskRemoveModal from "./TaskRemoveModal";
import TaskEditModal from "./TaskEditModal";

const TaskList = () => {
  const taskRows = useSelector(selectTasks);
  const dispatch = useDispatch();

  const { data: priorities } = useGetPrioritiesQuery("/");

  const [selectedRowId, setSelectedRowId] = useState<number | undefined>();
  const [editingTask, setEditingTask] = useState<Task>({
    id: selectedRowId,
    name: "",
    priority: "",
  });
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleNewTask = () => {
    setSelectedRowId(undefined);
    handleEditModalOpen();
  };

  // Add/Edit task modal functions
  const handleEditModalAccept = (task: Task) => {
    if (task.id) {
      dispatch(editTask({ task, id: task.id }));
    } else {
      dispatch(addTask({ task }));
    }

    setSelectedRowId(undefined);
    setEditingTask({ id: undefined, name: "", priority: "" });
    handleEditModalClose();
  };

  const handleEditModalOpen = (id?: number) => {
    const editingTask: any = taskRows.find(row => row.id === id);

    if (id) setSelectedRowId(id);
    setOpenEditModal(true);
    setEditingTask(editingTask);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  // Remove task modal functions
  const handleRemoveModalOpen = (id: number) => {
    setSelectedRowId(id);
    setOpenDeleteModal(true);
  };

  const handleRemoveModalClose = () => {
    setSelectedRowId(undefined);
    setOpenDeleteModal(false);
  };

  const handleDeleteRow = () => {
    selectedRowId && dispatch(removeTask({ id: selectedRowId }));
    handleRemoveModalClose();
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Task ID",
      flex: 2,
      align: "center",
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Task Name",
      editable: true,
      flex: 5,
    },
    {
      field: "priority",
      headerName: "Priority",
      sortComparator: (v1, v2, cellParams) => {
        return PriorityImportance[v1] > PriorityImportance[v2] ? 1 : -1;
      },
      flex: 2,
      align: "center",
      headerAlign: "center",
      headerClassName: "task-priority",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Chip
            variant="outlined"
            color={PriorityType[params.value]}
            label={params.value}
            sx={{ width: 80 }}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <IconButton onClick={() => handleEditModalOpen(params.row.id)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleRemoveModalOpen(params.row.id)}>
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Grid
        rows={taskRows}
        columns={columns}
        title={
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            Task List
            <Button onClick={handleNewTask} variant="contained" color="info" startIcon={<Add />}>
              Add Task
            </Button>
          </Stack>
        }
      />

      <TaskRemoveModal
        open={openDeleteModal}
        onAccept={handleDeleteRow}
        onCancel={handleRemoveModalClose}
      />
      <TaskEditModal
        open={openEditModal}
        editingTask={editingTask}
        isEditMode={!!selectedRowId}
        priorities={priorities}
        onAccept={handleEditModalAccept}
        onCancel={handleEditModalClose}
      />
    </>
  );
};

export default TaskList;
