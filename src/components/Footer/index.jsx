import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <Container>
        <CopyText>© {year} All rights reserved.</CopyText>
        <IconWrapper>
          <a
            href="https://github.com/cheetah-is-laughing"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </IconWrapper>
      </Container>
    </StyledFooter>
  );
};
export default Footer;

const StyledFooter = styled.footer`
  border-top: 1px solid lightgray;
`;

const Container = styled.div`
  max-width: 1280px;
  margin-inline: auto;
  padding: 1.25rem 1rem;
  text-align: center;
`;

const CopyText = styled.p`
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  font-size: 1.25rem;
`;
