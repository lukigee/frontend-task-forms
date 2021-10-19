import { ReactNode } from "react";
import styled from "styled-components";

const Form = styled.form`
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
`;

const AdditionalInfo = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

interface FormLayoutProps {
  children: ReactNode;
  additonalInfo: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export const FormLayout = ({
  children,
  additonalInfo,
  onSubmit,
}: FormLayoutProps) => {
  return (
    <>
      <Form onSubmit={onSubmit} noValidate>
        {children}
      </Form>
      <AdditionalInfo>{additonalInfo}</AdditionalInfo>
    </>
  );
};
