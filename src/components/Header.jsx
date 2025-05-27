import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: rgb(60, 12, 148);
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

/**
 * Top-level header displaying the application title.
 */
const Header = () => {
  return (
    <HeaderContainer data-testid="header">
      <Title>Concert Management</Title>
    </HeaderContainer>
  );
};

export default Header;
