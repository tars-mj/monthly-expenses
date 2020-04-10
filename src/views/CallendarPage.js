import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import PageTemplate from '../templates/PageTemplate';
import styled, { css } from 'styled-components';
import PaymentCard from '../components/organisms/PaymentCard';
import Button from '../components/atoms/Button';
import Modal from '../components/atoms/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const months = [
  {
    month: 1,
    name: 'January',
  },
  {
    month: 2,
    name: 'February',
  },
  {
    month: 3,
    name: 'March',
  },
  {
    month: 4,
    name: 'April',
  },
  {
    month: 5,
    name: 'May',
  },
  {
    month: 6,
    name: 'June',
  },
  {
    month: 7,
    name: 'July',
  },
  {
    month: 8,
    name: 'August',
  },
  {
    month: 9,
    name: 'September',
  },
  {
    month: 10,
    name: 'October',
  },
  {
    month: 11,
    name: 'November',
  },
  {
    month: 12,
    name: 'December',
  },
];

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
  padding: 4rem;
`;

const StyledYearBtn = styled.div`
  cursor: pointer;
  padding: 3px;
  transition: all 0.15s ease-in;
  border-radius: 4px;
  &:hover {
    padding: 5px;
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`;

const StyledSelectedYear = styled.div`
  margin: 0 auto;
  width: 30rem;
  height: 8rem;
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  grid-template-rows: 1fr;
  color: ${({ theme }) => theme.blue};
  justify-items: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontBold};
`;

const StyledArrow = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.aquamarine};
  background-color: ${({ theme }) => theme.white};
  border: 0;
  height: 100%;
  width: 5rem;
  font-size: ${({ theme }) => theme.fontSize.s};

  transition: background-color 0.15s ease-out;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }
`;

const CallendarPage = () => {
  const {
    selectedYear,
    selectedMonth,
    expenses,
    monthsClosed,
    selectMonth,
    setSelectedYear,
  } = useContext(DataContext);
  const [monthsStatus, setMonthsStatus] = useState([]);
  const [monthName, setMonthName] = useState('');
  const [modalYear, setModalYear] = useState(false);
  const [year, setYear] = useState();

  useEffect(() => {
    monthlyStatus();
    findMonthName();
    setYear(selectedYear);
  }, [selectedYear, selectedMonth, expenses, monthsClosed, selectMonth]);

  const monthlyStatus = () => {
    const filteredMonths = monthsClosed.filter((x) => x.year === selectedYear);
    setMonthsStatus(filteredMonths);
  };

  const findMonthName = () => {
    setMonthName(months.find((x) => x.month === selectedMonth).name);
  };

  const handleSelectYear = (type) => {
    if (type === 'minus') {
      setYear(year - 1);
    }
    if (type === 'plus') {
      setYear(year + 1);
    }
  };

  const acceptSelectYear = () => {
    setSelectedYear({ year });
    setYear(selectedYear);
    setModalYear(false);
  };

  return (
    <PageTemplate>
      <StyledWrapper>
        <StyledTop>
          <StyledHeader>
            <div>
              {monthName} {selectedYear}
            </div>
            <div>List of expenses</div>
          </StyledHeader>
          <StyledDates>
            <StyledYearBtn onClick={() => setModalYear(true)}>{selectedYear}</StyledYearBtn>
            {[...Array(12).keys()].map((m, i) => (
              <DateIcon
                key={i}
                isCompleted={monthsStatus.find((x) => x.month === i + 1)}
                isActive={i + 1 === selectedMonth}
                onClick={() => selectMonth({ month: i + 1 })}
              >
                {i + 1}
              </DateIcon>
            ))}
          </StyledDates>
        </StyledTop>
        <StyledContent>
          <PaymentCard />
          {modalYear && (
            <Modal
              title="Select year"
              closeModalFn={setModalYear}
              btn={
                <Button isActive onClick={() => acceptSelectYear()}>
                  Accept
                </Button>
              }
            >
              <StyledSelectedYear>
                <StyledArrow onClick={() => handleSelectYear('minus')}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </StyledArrow>
                {year}
                <StyledArrow onClick={() => handleSelectYear('plus')}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </StyledArrow>
              </StyledSelectedYear>
            </Modal>
          )}
        </StyledContent>
      </StyledWrapper>
    </PageTemplate>
  );
};

export default CallendarPage;
