import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // switch to 'dark' for dark mode
    primary: {
      main: "#6366f1", // indigo-500
    },
    secondary: {
      main: "#f97316", // orange-500
    },
    background: {
      default: "#f8fafc", // slate-50
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: { root: { overflow: "visible" } },
    },
  },
});

export default theme;
