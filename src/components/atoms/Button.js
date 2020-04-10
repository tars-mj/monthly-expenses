import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, isActive }) => (isActive ? theme.aquamarine : theme.gray)};
  cursor: ${({ isActive }) => (isActive ? 'cursor' : 'default')};
  border: 0;
  height: 5rem;
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 1rem 3rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease-out;
  &:focus {
    outline: none;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.green};
      }
    `};
`;

export default Button;
