import styled from 'styled-components';

export const StyledWrapperPage = styled.div`
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 8rem minmax(0, 1fr);
  grid-template-areas:
    'top'
    'bottom';
`;

export const StyledTop = styled.div`
  grid-area: top;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0px 15px -5px hsla(0, 0%, 0%, 0.1);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  padding: 0 2rem;
  *:last-child {
    justify-self: end;
  }
`;

export const StyledHeader = styled.div`
  color: ${({ theme }) => theme.blue};

  div:first-child {
    font-weight: ${({ theme }) => theme.fontLight};
    font-size: ${({ theme }) => theme.fontSize.s};
  }
  div:last-child {
    font-weight: ${({ theme }) => theme.fontBold};
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

export const StyledContent = styled.div`
  grid-area: bottom;
  align-content: start;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 4rem;
`;
