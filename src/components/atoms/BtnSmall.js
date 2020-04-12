import styled from 'styled-components';

const BtnSmall = styled.button`
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${({ type, theme, isActive }) =>
    !isActive ? theme.gray : type === 'edit' ? theme.red : theme.aquamarine};
  border: 0;
  border-radius: 0.4rem;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xss};
  margin: ${({ isMargin }) => isMargin && '0.5rem'};
  cursor: ${({ isActive }) => (isActive ? 'cursor' : 'default')};
  &:focus {
    outline: none;
  }
  transition: transform 0.25s ease-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export default BtnSmall;
