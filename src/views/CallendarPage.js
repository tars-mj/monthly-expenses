import React, { useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 100px minmax(0, 1fr);
  grid-template-areas:
    'top'
    'bottom';
`;

const StyledTop = styled.div`
  grid-area: top;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0px 15px -5px hsla(0, 0%, 0%, 0.1);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  align-items: center;
  padding: 0 20px;
`;

const StyledHeader = styled.div`
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

const DateIcon = styled.li`
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.aquamarine};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.aquamarine};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isCompleted }) =>
    isCompleted &&
    css`
      background-color: ${({ theme }) => theme.aquamarine};
      color: ${({ theme }) => theme.white};
    `}
`;

const StyledDates = styled.ul`
  justify-self: end;
  display: grid;
  grid-template-columns: 50px repeat(12, auto);
  grid-template-rows: minmax(0, 1fr);
  list-style-type: none;
  justify-items: center;
  align-items: center;
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.s};
  grid-gap: 8px;
`;

const StyledContent = styled.div`
  grid-area: bottom;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
`;

const StyledCard = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 10px 15px -15px hsla(0, 0%, 0%, 0.4);

  ul {
    display: grid;
    grid-template-columns: minmax(0, 1fr) repeat(4, 120px);
    grid-auto-rows: 40px;
    align-items: center;
    list-style-type: none;
    padding: 10px;
    border-top: 1px solid ${({ theme }) => theme.gray};
  }

  ul:first-child {
    color: ${({ theme }) => theme.lightBlue};
    font-weight: ${({ theme }) => theme.fontBold};
    font-size: ${({ theme }) => theme.fontSize.s};
    background-color: ${({ theme }) => theme.blue};
    border-radius: 5px 5px 0 0;
    grid-column: 1 / -1;
    height: 100%;
  }

  div {
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 0 5px 5px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CallendarPage = () => {
  return (
    <PageTemplate>
      <StyledWrapper>
        <StyledTop>
          <StyledHeader>
            <div>April 2020</div>
            <div>List of expenses</div>
          </StyledHeader>
          <StyledDates>
            <div>2020</div>
            {[...Array(12).keys()].map((m, i) => (
              <DateIcon key={i} isCompleted={i < 4}>
                {i + 1}
              </DateIcon>
            ))}
          </StyledDates>
        </StyledTop>
        <StyledContent>
          <StyledCard>
            <ul>
              <li>Payment name</li>
              <li>Type</li>
              <li>Amount</li>
              <li>Date</li>
              <li>Status</li>
            </ul>
            <ul>
              <li>Kredyt</li>
              <li>auto</li>
              <li>1000zł</li>
              <li>10.04</li>
              <li>x</li>
            </ul>
            <ul>
              <li>Kredyt</li>
              <li>auto</li>
              <li>1000zł</li>
              <li>10.04</li>
              <li>x</li>
            </ul>
            <div>
              <button>Zamknij miesiąc</button>
            </div>
          </StyledCard>
        </StyledContent>
      </StyledWrapper>
    </PageTemplate>
  );
};

export default CallendarPage;
