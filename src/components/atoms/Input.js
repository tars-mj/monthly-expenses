import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({
  type: props.type || 'search',
  placeholder: props.title,
  autoComplete: 'off',
}))`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.blue};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '5.5rem'};
  border: 0px solid ${({ theme, isError }) => (isError ? theme.red : theme.blue)};

  caret-color: ${({ theme }) => theme.blue};
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.gray};
  justify-self: self-start;

  &::placeholder {
    opacity: 1;
    color: ${({ theme }) => '#ccc'};
    transition: opacity 0.15s ease-out;
  }
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`;

export default Input;
