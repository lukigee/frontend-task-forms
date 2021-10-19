import { ReactNode } from "react";
import { Header } from "./Header";
import { Paper } from "./Paper";

interface GuestLayoutProps {
  children: ReactNode;
  title: string;
}

export const GuestLayout = ({ children, title }: GuestLayoutProps) => {
  return (
    <Paper>
      <Header>{title}</Header>
      {children}
    </Paper>
  );
};
