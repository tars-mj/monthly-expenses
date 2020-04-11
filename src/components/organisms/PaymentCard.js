import React, { useContext, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faCheck, faExclamation, faEdit } from '@fortawesome/free-solid-svg-icons';
import { statusPaymentConst, typePaymentConst } from '../../constants/index';
import { DataContext } from '../../context/DataContext';
import Button from '../atoms/Button';
import Modal from '../atoms/Modal';
import Input from '../atoms/Input';
import BtnSmall from '../atoms/BtnSmall';

const StyledCard = styled.section`
  width: 100%;
  max-width: 120rem;
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
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 0 5px 5px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

const StyledCardRow = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 160px repeat(2, 100px) 80px;
  grid-auto-rows: 40px;
  align-items: center;
  list-style-type: none;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.gray};
  transition: background-color 0.15s ease-out;
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.s};
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }

  li:last-child {
    justify-self: center;
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

const StyledAmount = styled.li`
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 2fr;
  grid-gap: 5px;
  align-items: center;
`;

const StyledInfo = styled.span`
  font-weight: ${({ theme }) => theme.fontLight};
  color: ${({ theme }) => theme.blue};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const PaymentCard = ({ isSettingsPage }) => {
  const {
    selectedYear,
    selectedMonth,
    expenses,
    addCloseMonth,
    monthsClosed,
    acceptPayment,
  } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [modalMonth, setModalMonth] = useState(false);
  const [modalManualPayment, setModalManualPayment] = useState(false);
  const [amount, setAmount] = useState({ id: 0, amount: 0 });

  const selectData = () => {
    const filterData = expenses.filter(
      (ex) => ex.year.indexOf(selectedYear) !== -1 && ex.month.indexOf(selectedMonth) !== -1,
    );
    setFilteredData(filterData);
  };

  useEffect(() => {
    selectData();
  }, [selectedYear, selectedMonth, expenses]);

  const selectStatusIcon = (history, deadline, typePayment) => {
    const findStatus = history.find((x) => x.month === selectedMonth);
    let status = findStatus ? findStatus.status : statusPaymentConst.waiting;
    let icon = faHourglassHalf;
    let deadlineComing = false;

    const margin = 3 * 24 * 60 * 60 * 1000; //days to deadline, days * hours * min * sec * miliseconds
    const currentDate = new Date().getTime();
    const deadlineDate = new Date(`${selectedYear}-${selectedMonth}-${deadline}`).getTime();
    deadlineComing = currentDate - (deadlineDate - margin) >= 0;

    //if status is not set to paid show deadline warrning
    if (status === statusPaymentConst.completed) {
      deadlineComing = false;
    }

    //check type payment - if auto set deadline to false
    if (typePayment === typePaymentConst.auto && deadlineDate < currentDate) {
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

    return {
      deadlineComing,
      status,
      icon,
    };
  };

  const monthClose = () => {
    addCloseMonth({ year: selectedYear, month: selectedMonth });
    setModalMonth(false);
  };

  const handleAcceptPayment = (id) => {
    const findPayment = filteredData.find((x) => x.id === id);
    acceptPayment({
      id: findPayment.id,
      status: 'completed',
      year: selectedYear,
      month: selectedMonth,
      amount: findPayment.amountExpected,
    });
  };

  const handleEditModalOpen = (id, amount) => {
    setAmount({ id, amount });
    setModalManualPayment(true);
  };

  const handleEditModalClose = () => {
    const findPayment = filteredData.find((x) => x.id === amount.id);
    acceptPayment({
      id: findPayment.id,
      status: 'completed',
      year: selectedYear,
      month: selectedMonth,
      amount: amount.amount,
    });
    setAmount({
      id: 0,
      amount: 0,
    });
    setModalManualPayment(false);
  };

  const handleSetAmount = (e) => {
    setAmount({
      ...amount,
      amount: e.target.value,
    });
  };

  return (
    <>
      <StyledCard>
        <StyledCardRow>
          <li>Payment name</li>
          <li>Amount</li>
          <li>Type</li>
          <li>Date</li>
          <li>Status</li>
        </StyledCardRow>
        {filteredData &&
          filteredData.map(({ id, name, typePayment, amountExpected, deadline, history }) => {
            const iconElements = selectStatusIcon(history, deadline, typePayment);
            const actualAmount = history.find(
              (x) => x.month === selectedMonth && x.year === selectedYear,
            );
            return (
              <StyledCardRow key={id}>
                <li>{name}</li>

                <StyledAmount>
                  {typePayment !== typePaymentConst.auto && (
                    <>
                      <BtnSmall
                        type="edit"
                        onClick={() =>
                          iconElements.status !== statusPaymentConst.completed &&
                          handleEditModalOpen(id, amountExpected)
                        }
                        isActive={iconElements.status !== statusPaymentConst.completed}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </BtnSmall>
                      <BtnSmall
                        type="accept"
                        isActive={iconElements.status !== statusPaymentConst.completed}
                        onClick={() =>
                          iconElements.status !== statusPaymentConst.completed &&
                          handleAcceptPayment(id)
                        }
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </BtnSmall>
                    </>
                  )}
                  {actualAmount ? actualAmount.amount : amountExpected}
                </StyledAmount>
                <li>{typePayment}</li>
                <li>{`${deadline}-${selectedMonth}-${selectedYear}`}</li>
                <li>
                  <StatusIcon
                    status={iconElements.status}
                    deadlineComing={iconElements.deadlineComing}
                  >
                    <FontAwesomeIcon icon={iconElements.icon} />
                  </StatusIcon>
                </li>
              </StyledCardRow>
            );
          })}
        <div>
          {filteredData.length !== 0 ? (
            <Button
              isActive={
                !monthsClosed.find((x) => x.year === selectedYear && x.month === selectedMonth)
              }
              onClick={() =>
                !monthsClosed.find((x) => x.year === selectedYear && x.month === selectedMonth) &&
                setModalMonth(true)
              }
            >
              Close the month
            </Button>
          ) : (
            <StyledInfo>List on this month is empty</StyledInfo>
          )}
        </div>
      </StyledCard>
      {modalMonth && (
        <Modal
          title="Are you sure you want to close the month?"
          closeModalFn={setModalMonth}
          btn={
            <Button isActive onClick={() => monthClose()}>
              Close the month
            </Button>
          }
        ></Modal>
      )}
      {modalManualPayment && (
        <Modal
          title="Enter the value of the payment"
          closeModalFn={setModalManualPayment}
          btn={
            <Button isActive onClick={() => handleEditModalClose()}>
              Accept
            </Button>
          }
        >
          <Input type="number" title={amount.amount} onChange={(e) => handleSetAmount(e)} />
        </Modal>
      )}
    </>
  );
};

export default PaymentCard;
