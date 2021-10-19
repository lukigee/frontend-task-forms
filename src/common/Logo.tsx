import styled from "styled-components";

interface DiagonalLineProps {
  secondary?: Boolean;
}

const DiagonalLine = styled.div<DiagonalLineProps>`
  width: 100%;
  border: 1px solid black;
  transform: ${(props) => (props.secondary ? "skewY(45deg)" : "skewY(-45deg)")};
  top: ${(props) => (props.secondary ? "46%" : "49%")};
  position: relative;
`;

const LogoWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: whitesmoke;
  border: 1px solid black;
  box-shadow: 0.1em 0.1em 0.2em black;
`;
export const Logo = () => {
  return (
    <LogoWrapper>
      <DiagonalLine />
      <DiagonalLine secondary />
    </LogoWrapper>
  );
};
