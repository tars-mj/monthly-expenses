import React, { useState, useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import {
  StyledWrapperPage,
  StyledTop,
  StyledHeader,
  StyledContent,
} from '../components/moleculs/StyledPageElements';
import styled, { css } from 'styled-components';
import Modal from '../components/atoms/Modal';
import Button from '../components/atoms/Button';
import { DataContext } from '../context/DataContext';
import PaymentCardSettings from '../components/organisms/PaymentCardSettings';
import PaymentForm from '../components/organisms/PaymentForm';

const StyledSection = styled.section`
  width: 100%;

  max-width: 1200px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 10px 15px -15px hsla(0, 0%, 0%, 0.4);
  margin-bottom: 4rem;

  ul:first-child {
    color: ${({ theme }) => theme.lightBlue};
    font-weight: ${({ theme }) => theme.fontBold};
    font-size: ${({ theme }) => theme.fontSize.s};
    background-color: ${({ theme }) => theme.blue};
    border-radius: 5px 5px 0 0;
    grid-column: 1 / -1;
    height: 60px;
  }
`;

const StyledCategoryRow = styled.ul`
  display: flex;

  align-items: center;
  list-style-type: none;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.gray};
  transition: background-color 0.15s ease-out;
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const CategoryTag = styled.span`
  width: auto;
  background-color: ${({ theme }) => theme.gray};
  padding: 5px;
  border-radius: 4px;
  text-transform: lowercase;
  font-weight: ${({ theme }) => theme.fontThin};
  color: ${({ theme }) => theme.green};
  margin: 4px;
`;

const SettingsPage = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const { categories } = useContext(DataContext);

  const handleAddPayment = () => {
    setPaymentModal(false);
  };

  return (
    <PageTemplate>
      <StyledWrapperPage>
        <StyledTop>
          <StyledHeader>
            <div>Settings</div>
            <div>Payment options</div>
          </StyledHeader>
          <Button onClick={() => setPaymentModal(true)} width="22rem" isActive>
            Add new payment
          </Button>
        </StyledTop>
        <StyledContent>
          <StyledSection>
            <StyledCategoryRow>Your categories</StyledCategoryRow>
            <StyledCategoryRow>
              {categories &&
                categories.map((cat) => <CategoryTag key={cat.id}>{cat.label}</CategoryTag>)}
            </StyledCategoryRow>
          </StyledSection>

          <PaymentCardSettings isSettingsPage />
        </StyledContent>
      </StyledWrapperPage>
      {paymentModal && (
        <Modal title="Add new payment" closeModalFn={setPaymentModal}>
          <PaymentForm onCloseModal={setPaymentModal}></PaymentForm>
        </Modal>
      )}
    </PageTemplate>
  );
};

export default SettingsPage;
