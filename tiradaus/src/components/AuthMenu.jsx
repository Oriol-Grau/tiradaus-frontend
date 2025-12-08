import { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../services/account";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "../routes/routes.json";
import { selectAuth } from "../store/authSlice";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: "inherit",
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

export default function AuthMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const sendLogutRequest = async () => {
    try {
      await signOut();
      dispatch({ type: "auth/logout" });
      navigate(routes.home?.index || "/");
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  const handleProfileMenuOpen = () => {
    navigate(routes.account.login);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sendLogutRequest();
  };

  const handleEditProfile = () => {
    setAnchorEl(null);
    navigate(routes.account.profile);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="account-button"
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={open ? "menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={data?.username == null ? handleProfileMenuOpen : handleOpen}
        color="inherit"
      >
        <AccountCircle />
        {data?.username != null ? (
          <Typography variant="h6">{data.username}</Typography>
        ) : null}
      </IconButton>
      <StyledMenu
        id="menu"
        slotProps={{
          list: {
            "aria-labelledby": "button",
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {data?.username != null ? (
          <>
            <MenuItem key="perfil" onClick={handleEditProfile} disableRipple>
              Perfil
            </MenuItem>
            <MenuItem key="sortir" onClick={handleLogout} disableRipple>
              Sortir
            </MenuItem>
          </>
        ) : null}
      </StyledMenu>
    </>
  );
}
