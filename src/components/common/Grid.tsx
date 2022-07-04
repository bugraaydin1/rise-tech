import { ReactNode, useState, ChangeEvent, useCallback } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridSortItem,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

interface Props {
  title: string | ReactNode;
  rows: GridRowModel[];
  columns: GridColDef[];
}

const Grid = (props: Props) => {
  const { title, rows, columns } = props;

  const [sortModel, setSortModel] = useState<GridSortModel>([gridSortModel[0]]);
  const [selectedSort, setSelectedSort] = useState<number | undefined>();

  const SearchToolbar = useCallback(() => {
    const handleTaskOrderChange = (evt: ChangeEvent<HTMLInputElement>) => {
      setSelectedSort(Number(evt.target.value));
      setSortModel([gridSortModel[evt.target.value]]);
    };

    return (
      <GridToolbarContainer sx={{ p: 2, bgcolor: "primary.main" }}>
        <GridToolbarQuickFilter color="secondary" sx={{ py: 1, pl: 2, pr: 3 }} />

        <TextField
          select
          margin="dense"
          color="secondary"
          id="order-by-select"
          label="Task Order"
          sx={{ width: { sm: 180, md: 320 } }}
          value={selectedSort}
          onChange={handleTaskOrderChange}>
          {gridSortModel.map((option: GridSortItem, idx) => (
            <MenuItem key={option.field + idx} value={idx}>
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                {option.field} {option.sort}
              </Typography>
            </MenuItem>
          ))}
        </TextField>
      </GridToolbarContainer>
    );
  }, [rows]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ m: 3, height: 500, width: "80%" }}>
        <Typography variant="h6">{title}</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 50]}
          disableColumnMenu
          disableSelectionOnClick
          sortModel={sortModel}
          sortingOrder={["asc", "desc"]}
          onSortModelChange={model => setSortModel(model)}
          components={{ Toolbar: SearchToolbar }}
          componentsProps={{
            toolbar: {
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

const gridSortModel: GridSortModel = [
  {
    field: "priority",
    sort: "desc",
  },
  {
    field: "priority",
    sort: "asc",
  },
  {
    field: "name",
    sort: "desc",
  },
  {
    field: "name",
    sort: "asc",
  },
];

export default Grid;
