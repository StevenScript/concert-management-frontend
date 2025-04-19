import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: rgb(65, 25, 25);
  color: #777;
  padding: 1rem;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

const Footer = () => {
  return (
    <FooterContainer data-testid="footer">
      &copy; {new Date().getFullYear()} Concert Management. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
