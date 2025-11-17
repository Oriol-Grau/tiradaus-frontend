import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./Search";
import MenuHeader from "./Menu";
import styles from "./Header.module.css";
import AuthMenu from "./AuthMenu";
import { UserRoles } from "../constants/app";
import routes from "../routes/routes.json";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <MenuHeader title="Sales" elements={["Jocs de cartes", "Videojocs"]} />
      <MenuHeader
        title="Llistes de jocs"
        elements={["Presencials", "Online"]}
      />
      <Button>Calendari</Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Identifac't</MenuItem>
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static" className={styles.container}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <img alt="logo" src="/assets/images/logo.png" />
        </IconButton>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Tiradaus
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Jocs de catres, sales, ciutat..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <MenuHeader
            titleMenu="Llistes de jocs"
            elements={[{ nom: "Presencials", path: routes.jocs.presencials }, { nom: "Online", path: routes.jocs.online }, { nom: "Crear Joc", role: UserRoles.ADMIN, path: routes.jocs.crear }]}
          />
          <MenuHeader
            titleMenu="Sales"
            elements={[{ nom: "Jocs de cartes", path: routes.jocs.presencials }, { nom: "Videojocs", path: routes.jocs.presencials }, { nom: "Crear sala", role: UserRoles.ADMIN, path: routes.jocs.presencials }]}
          />
          <Button
            variant="text"
            disableElevation
            size="large"
            sx={{ fontSize: "18px" }}
          >
            Calendari
          </Button>
          <AuthMenu />
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    /* {renderMobileMenu}
      {renderMenu} */
  );
}

export default Header;
