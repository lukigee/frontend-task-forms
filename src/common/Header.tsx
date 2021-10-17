import styled from "styled-components";

const HeaderWrapper = styled.h2`
  font-family: cursive;
  left: -6em;
  position: relative;
`;

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return <HeaderWrapper>{children}</HeaderWrapper>;
};
