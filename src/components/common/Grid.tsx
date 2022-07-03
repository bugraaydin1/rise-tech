import { memo, ReactNode, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridSortModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

interface Props {
  title: string | ReactNode;
  rows: GridRowModel[];
  columns: GridColDef[];
}

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

const Grid = (props: Props) => {
  const { title, rows, columns } = props;

  const [sortModel, setSortModel] = useState<GridSortModel>(gridSortModel);

  const SearchToolbar = () => {
    return (
      <GridToolbarContainer sx={{ p: 2, bgcolor: "primary.main" }}>
        <GridToolbarQuickFilter color="secondary" sx={{ py: 1, pl: 2, pr: 3 }} />

        <TextField
          select
          margin="dense"
          color="secondary"
          id="order-by"
          label="Task Order"
          sx={{ width: { sm: 180, md: 360 } }}
          value={sortModel[0].field}
          onChange={evt => setSortModel([gridSortModel[evt.target.value]])}>
          {gridSortModel.map((option: any, idx) => (
            <MenuItem key={option.field + idx} value={idx}>
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
                {option.field} {option.sort}
              </Typography>
            </MenuItem>
          ))}
        </TextField>
      </GridToolbarContainer>
    );
  };

  console.log(sortModel);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ m: 3, height: 500, width: "80%" }}>
        <Typography variant="h6">{title}</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 50]}
          //   disableColumnMenu
          disableSelectionOnClick
          sortModel={sortModel}
          sortingOrder={["asc", "desc"]}
          onSortModelChange={model => setSortModel(model)}
          components={{ Toolbar: SearchToolbar }}
          componentsProps={{
            toolbar: {
              quickFilterProps: { debounceMs: 500 },
            },
            columnMenu: { color: "red" },
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(Grid);
