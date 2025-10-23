import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export function Account() {
    
  function handleLogIn() {}

  function handleLogOut() {}
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Ususari">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="login" onClick={handleLogIn}>
          <Typography sx={{ textAlign: "center" }}>Identica't</Typography>
        </MenuItem>
        <MenuItem key="logout" onClick={handleLogOut}>
          <Typography sx={{ textAlign: "center" }}>Surt</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
