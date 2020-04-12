import React, { useState, useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import {
  StyledWrapperPage,
  StyledTop,
  StyledHeader,
  StyledContent,
} from '../moleculs/StyledPageElements';
import styled, { css } from 'styled-components';
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import { DataContext } from '../../context/DataContext';
import PaymentCardSettings from '../organisms/PaymentCardSettings';
import PaymentForm from '../organisms/PaymentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CategoryForm from '../organisms/CategoryForm';

const StyledSection = styled.section`
  width: 100%;

  max-width: 120rem;
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
    height: 5rem;
  }
`;

const StyledCategoryRow = styled.ul`
  display: flex;

  align-items: center;
  list-style-type: none;
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.gray};
  transition: background-color 0.15s ease-out;
  color: ${({ theme }) => theme.blue};
  font-weight: ${({ theme }) => theme.fontLight};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const CategoryTag = styled.span`
  width: auto;
  background-color: ${({ theme }) => theme.gray};
  padding: 0.5rem;
  border-radius: 0.4rem;
  text-transform: lowercase;
  font-weight: ${({ theme }) => theme.fontThin};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.green};
  margin: 0.4rem;
  position: relative;
  cursor: pointer;
`;

const AddCategory = styled.button`
  border: 0;
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.white};
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.4rem;
  margin: 0.4rem;
  &:focus {
    outline: none;
  }
  transition: transform 0.25s ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const SettingsPage = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [id, setId] = useState();
  const { categories } = useContext(DataContext);

  const handleEditModalOpen = (id) => {
    setId(id);
    setEditCategoryModal(true);
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
                categories.map((cat) => (
                  <CategoryTag onClick={() => handleEditModalOpen(cat.id)} key={cat.id}>
                    {cat.label}
                  </CategoryTag>
                ))}
              <AddCategory onClick={() => setCategoryModal(true)}>
                <FontAwesomeIcon icon={faPlus} />
              </AddCategory>
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
      {categoryModal && (
        <Modal title="Add new category" closeModalFn={setCategoryModal}>
          <CategoryForm onCloseModal={setCategoryModal} />
        </Modal>
      )}
      {editCategoryModal && (
        <Modal title="Edit category" closeModalFn={setEditCategoryModal}>
          <CategoryForm id={id} onCloseModal={setEditCategoryModal} />
        </Modal>
      )}
    </PageTemplate>
  );
};

export default SettingsPage;
