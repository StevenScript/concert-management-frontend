import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const PageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
});

export const SectionWrapper = styled(Paper)(({ theme }) => ({
  padding: "2rem",
  margin: "1.5rem 0",
  width: "100%",
  maxWidth: 900,
  backdropFilter: "blur(8px)",
  boxShadow: "0 4px 18px rgba(0,0,0,.08)",
  background:
    theme.palette.mode === "light"
      ? "rgba(255,255,255,.9)"
      : "linear-gradient(145deg,#1e293b 0%,#0f172a 100%)",
  color: theme.palette.text.primary,
  borderRadius: 12,
}));

export const Title = styled("h1")(({ theme }) => ({
  fontSize: "2rem",
  marginBottom: "1rem",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

export const CenteredForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});
