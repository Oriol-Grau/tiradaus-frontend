import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  cssVariables: true,
  palette: {
    background: {
      main: '#836BB9',
      secondary: '#FFFFFF',
      forms: '#DDDDF0',
      footer: '#463768',
      header: '#AAAAFE',
      menus: '#E7DDFF'
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: red.A400,
    },
    buttonPrimary: {
      main: '#665593',
      contrastText: '#CACE50'
    },
    buttonSecondary: {
      main: '#CACE50',
      contrastText: '#665593'
    },
  },
  typography: {
    // Primary font for the app; falls back to common system fonts
    fontFamily: '"Jersey 25", sans-serif;',
    // sensible defaults
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600, lineHeight: 1 },
    h4: { fontWeight: 600 },
    body1: { fontWeight: 400, fontSize: '1.2rem'},
    body2: { fontWeight: 300, fontSize: '1.1rem' },
    button: { textTransform: "none" },
  },
});

export default theme;
