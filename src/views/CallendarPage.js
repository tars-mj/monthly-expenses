import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import PageTemplate from '../templates/PageTemplate';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { statusPaymentConst, typePaymentConst } from '../constants/index';
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
  color: ${({ theme }) => theme.gray};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.15s ease-in;

  ${({ isCompleted }) =>
    isCompleted &&
    css`
      background-color: ${({ theme }) => theme.aquamarine};
      color: ${({ theme }) => theme.white};
      border: 2px solid ${({ theme }) => theme.aquamarine};
    `}

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.white};
      border: 2px solid ${({ theme }) => theme.blue};
    `}

		&:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
    border: 2px solid ${({ theme }) => theme.blue};
    cursor: pointer;
  }
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
  max-width: 1200px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 10px 15px -15px hsla(0, 0%, 0%, 0.4);

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

const StyledCardRow = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(3, 120px) 80px;
  grid-auto-rows: 40px;
  align-items: center;
  list-style-type: none;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.gray};
  transition: background-color 0.15s ease-out;
  color: ${({ theme }) => theme.navyBlue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.s};
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }

  li:last-child {
    justify-self: center;
  }
`;

const PaymentCard = () => {
  const { selectedYear, selectedMonth, expenses } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);

  const selectData = () => {
    const filterData = expenses.filter(
      (ex) => ex.year.indexOf(selectedYear) !== -1 && ex.month.indexOf(selectedMonth) !== -1,
    );
    setFilteredData(filterData);
  };

  useEffect(() => {
    selectData();
  }, []);

  const selectStatusIcon = (history, deadline, typePayment) => {
    const findStatus = history.find((x) => x.month === selectedMonth);
    let status = findStatus ? findStatus.status : statusPaymentConst.waiting;
    let icon = faHourglassHalf;
    let deadlineComing = false;

    const margin = 3 * 24 * 60 * 60 * 1000; //days to deadline, days * hours * min * sec * miliseconds
    const currentDate = new Date().getTime();
    const currentDay = new Date().getDate();
    const deadlineDate = new Date(`${selectedYear}-${selectedMonth}-${deadline}`).getTime();
    deadlineComing = currentDate - (deadlineDate - margin) >= 0;

    //if status is not set to paid show deadline warrning
    if (status === statusPaymentConst.completed) {
      deadlineComing = false;
    }

    //check type payment - if auto set deadline to false
    if (typePayment === 'auto' && currentDay > deadline) {
      deadlineComing = false;
      status = statusPaymentConst.completed;
    }

    if (currentDate)
      switch (status) {
        case statusPaymentConst.waiting:
          icon = faHourglassHalf;
          break;
        case statusPaymentConst.completed:
          icon = faCheck;
          break;
        default:
          icon = faHourglassHalf;
          break;
      }

    //if payment type is automate, dont set icon on warrning if deadline is ended
    console.log(deadlineComing, status, icon);
    return {
      deadlineComing,
      status,
      icon,
    };
  };

  return (
    <StyledCard>
      <StyledCardRow>
        <li>Payment name</li>
        <li>Type</li>
        <li>Amount</li>
        <li>Date</li>
        <li>Status</li>
      </StyledCardRow>
      {filteredData &&
        filteredData.map(({ id, name, typePayment, amountExpected, deadline, history }) => (
          <StyledCardRow key={id}>
            <li>{name}</li>
            <li>{typePayment}</li>
            <li>{amountExpected}</li>
            <li>{`${deadline}-${selectedMonth}-${selectedYear}`}</li>
            <li>
              <StatusIcon
                status={selectStatusIcon(history, deadline, typePayment).status}
                deadlineComing={selectStatusIcon(history, deadline, typePayment).deadlineComing}
              >
                <FontAwesomeIcon icon={selectStatusIcon(history, deadline, typePayment).icon} />
              </StatusIcon>
            </li>
          </StyledCardRow>
        ))}
    </StyledCard>
  );
};

const Button = styled.button`
  display: flex;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.aquamarine};
  border: 0;
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 10px 30px;
  border-radius: 5px;
  transition: background-color 0.15s ease-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.green};
  }
`;

const StatusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.gray};

  ${({ status }) =>
    status === statusPaymentConst.completed &&
    css`
      background-color: ${({ theme }) => theme.aquamarine};
    `};

  ${({ deadlineComing }) =>
    deadlineComing === true &&
    css`
      background-color: ${({ theme }) => theme.red};
    `};
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
              <DateIcon key={i} isCompleted={i < 4} isActive={i === 4}>
                {i + 1}
              </DateIcon>
            ))}
          </StyledDates>
        </StyledTop>
        <StyledContent>
          <PaymentCard />
        </StyledContent>
      </StyledWrapper>
    </PageTemplate>
  );
};

export default CallendarPage;
