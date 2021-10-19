import styled from "styled-components";

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  height: 3em;
  border: 0px;
  border-bottom: 1px solid
    ${(props) => (props.hasError ? "#eb5757" : "#e5ecec")};
  box-sizing: border-box;
  color: #444355;
  :focus {
    outline: none;
    border-bottom-color: #444355;
  }
  ::placeholder {
    color: #bdbdbd;
  }
`;

const InputError = styled.p`
  color: #eb5757;
  font-size: 0.75rem;
  margin: 0;
`;

const TextFieldWrapper = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  width: 100%;
  height: 5em;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  color: #61616e;
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = ({ error, label, ...rest }: TextFieldProps) => {
  return (
    <TextFieldWrapper>
      <Label>
        {label}
        <Input {...rest} hasError={!!error} />
      </Label>
      {error && <InputError>{error}</InputError>}
    </TextFieldWrapper>
  );
};
