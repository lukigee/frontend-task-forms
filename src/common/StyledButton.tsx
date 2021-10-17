import styled from "styled-components";

const ButtonWrapper = styled.button`
  font-family: cursive;
  width: 12em;
  height: 4em;
  background-color: black;
  color: white;
  box-shadow: 0.2em 0.4em 0.2em grey;
  align-self: center;
  font-size: 1.2em;
  margin-top: 0.5em;
`;

interface ButtonProps {
  children?: React.ReactNode;
  type: "button" | "submit" | "reset" | undefined;
}

export const StyledButton = ({ children, type = "submit" }: ButtonProps) => {
  const handleOnclick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return <ButtonWrapper type={type}>{children}</ButtonWrapper>;
};
