import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../store/authSlice";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
    backgroundColor: theme.palette.background.menus,
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
        // ...theme.applyStyles("dark", {
        //   color: "inherit",
        // }),
      },
      // "&:active": {
      //   backgroundColor: alpha(
      //     theme.palette.primary.main,
      //     theme.palette.action.selectedOpacity
      //   ),
      // },
    },
    // ...theme.applyStyles("dark", {
    //   color: theme.palette.grey[300],
    // }),
  },
}));

export default function MenuHeader({ titleMenu, elements }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useSelector(selectAuth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(data?.roleId);
  };

  const handleClose = (event) => {
    const target = event.currentTarget || event.target;
    const path = target?.getAttribute?.("data-path") ?? target?.dataset?.path;

    setAnchorEl(null);

    if (path) {
      navigate(path);
    }
  };

  return (
    <>
      <Button
        id="button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        size="large"
        onClick={handleClick}
        sx={{ fontSize: "18px" }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {titleMenu}
      </Button>
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
        {elements.map(({ nom, role, path }) =>
          !role || role === data?.roleId ? (
            <MenuItem
              key={nom.trim()}
              onClick={handleClose}
              data-path={path}
              disableRipple
            >
              {nom}
            </MenuItem>
          ) : null
        )}
      </StyledMenu>
    </>
  );
}
