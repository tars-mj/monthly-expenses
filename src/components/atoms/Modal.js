import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faTimes } from '@fortawesome/free-solid-svg-icons';

const BtnSmall = styled.button`
  width: 31px;
  height: 31px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.white};
  border: none;
  color: ${({ theme }) => theme.blue};
  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.2);
  }
  &:focus {
    outline: 0;
  }
`;

const StyledModalWrapper = styled.div`
  background-color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: grayscale(1) blur(2px);

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalCard = styled.div`
  width: 800px;
  height: auto;
  background-color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 10px 30px -15px hsla(0, 0%, 0%, 0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px auto 80px;
  justify-items: center;
`;

const StyledModalHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.blue};
  border-radius: 5px 5px 0 0;
  padding: 10px;
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  color: ${({ theme }) => theme.lightBlue};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const StyledContentModal = styled.div`
  width: 90%;
  padding: 20px;
`;

const Modal = ({ closeModalFn, children, btn, title }) => (
  <StyledModalWrapper>
    <StyledModalCard>
      <StyledModalHeader>
        {title || 'title'}
        <BtnSmall onClick={() => closeModalFn()}>
          <FontAwesomeIcon size="1x" icon={faTimes} />
        </BtnSmall>
      </StyledModalHeader>
      <StyledContentModal>{children}</StyledContentModal>
      {btn}
    </StyledModalCard>
  </StyledModalWrapper>
);

Modal.propTypes = {
  // children: PropTypes.element.isRequired,
  closeModalFn: PropTypes.func.isRequired,
};

export default Modal;
