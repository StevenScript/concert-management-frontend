import { createTheme } from "@mui/material/styles";

/* ---------- shared settings ---------- */
const base = {
  typography: {
    fontFamily: `"Inter","Roboto","Helvetica","Arial",sans-serif`,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiCard: { styleOverrides: { root: { overflow: "visible" } } },
  },
};

/* ---------- design tokens ---------- */
export const getDesignTokens = (mode = "light") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          /* ---------- LIGHT ---------- */
          primary: { main: "#6366f1" }, // indigo-500
          secondary: { main: "#f97316" }, // orange-500
          background: { default: "#f8fafc", paper: "#ffffff" }, // slate-50
        }
      : {
          /* ---------- DARK ---------- */
          primary: { main: "#8b5cf6" }, // violet-500
          secondary: { main: "#fb923c" }, // orange-400
          background: { default: "#0f172a", paper: "#1e293b" }, // slate-900 / 800
        }),
  },
  ...base,
});

/* ---------- helper to create a theme directly ---------- */
export const createAppTheme = (mode = "light") =>
  createTheme(getDesignTokens(mode));

/* ---------- default export (kept for legacy imports) ---------- */
export default createAppTheme(); // creates a *light* theme by default
