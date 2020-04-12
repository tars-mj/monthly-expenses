import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../../context/DataContext';
import BtnSmall from '../atoms/BtnSmall';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import PaymentForm from '../organisms/PaymentForm';

const StyledCard = styled.section`
  width: 100%;
  max-width: 120rem;
  background-color: ${({ theme }) => theme.white};
  border-radius: 0.5rem;
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
    padding: 1rem;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 0 5px 5px;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
`;

const StyledCardRow = styled.ul`
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(4, 10rem) 8rem;
  grid-auto-rows: 3rem;
  align-items: center;
  list-style-type: none;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.gray};
  transition: background-color 0.15s ease-out;
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.xs};
  &:hover {
    background-color: ${({ theme }) => theme.gray};
  }

  li:last-child {
    justify-self: center;
  }
`;

const StyledAmount = styled.li`
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 2fr;
  grid-gap: 0.5rem;
  align-items: center;
`;

const PaymentCardSettings = () => {
  const { selectedYear, selectedMonth, expenses, removePayment } = useContext(DataContext);
  const [filteredData, setFilteredData] = useState([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    selectData();
  }, [selectedYear, selectedMonth, expenses]);

  const selectData = () => {
    console.log(expenses);
    setFilteredData(expenses);
  };

  const handleEditModalOpen = (id) => {
    setEditModal(true);
    setId(id);
  };

  const handleRemoveModalOpen = (id) => {
    setRemoveModal(true);
    setId(id);
  };

  const handleRemove = () => {
    removePayment({ id });
    setRemoveModal(false);
    setId(0);
  };

  return (
    <>
      <StyledCard>
        <StyledCardRow>
          <li>Payment name</li>
          <li>Category</li>
          <li>Amount</li>
          <li>Type</li>
          <li>Date</li>
          <li>Action</li>
        </StyledCardRow>
        {filteredData &&
          filteredData.map(
            ({ id, name, typePayment, amountExpected, deadline, history, category }) => {
              return (
                <StyledCardRow key={id}>
                  <li>{name}</li>
                  <li>{category.label}</li>
                  <StyledAmount>{`${amountExpected}zł`}</StyledAmount>
                  <li>{typePayment}</li>
                  <li>{`${deadline}-${selectedMonth}-${selectedYear}`}</li>
                  <li>
                    <BtnSmall isActive onClick={() => handleEditModalOpen(id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </BtnSmall>
                    <BtnSmall
                      isMargin
                      isActive
                      type="edit"
                      onClick={() => handleRemoveModalOpen(id)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </BtnSmall>
                  </li>
                </StyledCardRow>
              );
            },
          )}
      </StyledCard>
      {removeModal && (
        <Modal
          title="Are you sure?"
          closeModalFn={setRemoveModal}
          btn={
            <Button isActive onClick={() => handleRemove()}>
              Remove
            </Button>
          }
        >
          This payment will remove and all historical data will be lost
        </Modal>
      )}
      {editModal && (
        <Modal title="Edit payment" closeModalFn={setEditModal}>
          <PaymentForm id={id} isEdit onCloseModal={setEditModal}></PaymentForm>
        </Modal>
      )}
    </>
  );
};

export default PaymentCardSettings;
