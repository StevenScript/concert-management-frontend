import styled from "styled-components";
import { Paper } from "@mui/material";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const SectionWrapper = styled(Paper)`
  padding: 2rem;
  margin: 1.5rem 0;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

export const CenteredForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  width: 100%;
`;
