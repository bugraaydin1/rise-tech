import { createTheme } from "@mui/material/styles";
import { amber, red } from "@mui/material/colors";

export const mainTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: 14,
    h5: {
      fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "bold",
      fontSize: 21,
      paddingTop: 4,
      paddingBottom: 8,
    },
    h6: {
      fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
      fontSize: 16,
      paddingTop: 4,
      paddingBottom: 12,
    },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "capitalize" } } },
  },
  palette: {
    primary: {
      light: amber[200],
      main: amber[400],
      dark: amber[600],
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700],
    },
  },
});
