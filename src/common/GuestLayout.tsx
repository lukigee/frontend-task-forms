import { ReactNode } from "react";
import { Paper } from "./Paper";
import styled from "styled-components";
interface GuestLayoutProps {
  children: ReactNode;
  title: string;
}
export const Header = styled.h1`
  position: relative;
  margin: 0;
`;

export const GuestLayout = ({ children, title }: GuestLayoutProps) => {
  return (
    <Paper>
      <Header>{title}</Header>
      {children}
    </Paper>
  );
};
