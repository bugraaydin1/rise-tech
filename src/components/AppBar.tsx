import Appbar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const AppBar = () => {
  return (
    <Appbar position="static" sx={{ mb: 4 }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            href="/"
            variant="h5"
            component="a"
            sx={{
              mr: 3,
              mb: -1,
            }}>
            <img src="aba-logo-alpha.png" alt="logo" height={30} />
          </Typography>

          <Typography variant="h5" color="whitesmoke">
            Task Organizer
          </Typography>
        </Toolbar>
      </Container>
    </Appbar>
  );
};

export default AppBar;
