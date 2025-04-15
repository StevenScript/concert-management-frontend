import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #3f51b5;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const Header = () => {
  return (
    <HeaderContainer data-testid="header">
      <Title>Concert Management</Title>
    </HeaderContainer>
  );
};

export default Header;
