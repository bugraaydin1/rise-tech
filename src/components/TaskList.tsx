import { useState } from "react";
import { Button, Chip, IconButton, Stack } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import { PriorityImportance, PriorityType } from "../data/enum/Priority";
import { Priority, Task } from "src/data/models/TaskModel";
import Grid from "./common/Grid";
import TaskRemoveModal from "./TaskRemoveModal";
import TaskEditModal from "./TaskEditModal";

interface Props {
  initialRows: Task[];
}

const TaskList = (props: Props) => {
  const { initialRows } = props;

  const [rows, setRows] = useState<Task[]>(initialRows);
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

  // Add/Edit task modal
  const handleEditModalAccept = (task: Task) => {
    if (task?.id) {
      const newRows = rows.map(row => {
        if (row.id === selectedRowId) {
          return { ...row, ...task };
        } else return row;
      });

      setRows(newRows);
    } else {
      setRows([...rows, { ...task, id: Math.ceil(Math.random() * 30) }]);
    }

    handleEditModalClose();
  };

  const handleEditModalOpen = (id?: number) => {
    const editingTask: any = rows.find(row => row.id === id);

    if (id) setSelectedRowId(id);
    setOpenEditModal(true);
    setEditingTask(editingTask);
  };

  const handleEditModalClose = () => {
    setOpenEditModal(false);
  };

  // Remove task modal
  const handleRemoveModalOpen = (id: number) => {
    setSelectedRowId(id);
    setOpenDeleteModal(true);
  };

  const handleRemoveModalClose = () => {
    setSelectedRowId(-1);
    setOpenDeleteModal(false);
  };

  const handleDeleteRow = () => {
    const newRows = rows.filter(row => row.id != selectedRowId);

    setRows(newRows);
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
        rows={rows}
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
        priorities={Object.keys(PriorityType) as Priority[]}
        onAccept={handleEditModalAccept}
        onCancel={handleEditModalClose}
      />
    </>
  );
};

export default TaskList;
