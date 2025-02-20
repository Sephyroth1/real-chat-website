import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#003049" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#fdf0d5" }}>
          ChatConnect
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header

