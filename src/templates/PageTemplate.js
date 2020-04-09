import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartArea, faSignOutAlt, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import { theme } from '../theme/theme';
import { routes } from '../routes';

const StyledBoardLayout = styled.div`
  margin: 0;
  padding: 0 0 0 0;
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-columns: 100px auto;
  grid-template-rows: minmax(0, 1fr);
  grid-template-areas: 'menu main';
  background-color: ${({ theme }) => theme.brown1};
`;

const StyledMenu = styled.div`
  grid-area: menu;
  background-color: ${({ theme }) => theme.navyBlue};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 100px repeat(3, 80px) minmax(0, 1fr) 80px;
  grid-template-areas:
    'logo'
    'callendar'
    'statistics'
    'settings'
    '.'
    'logout';
`;

const WrapperButton = styled.div`
  grid-area: ${({ area }) => area || 'logo'};
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonMenu = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  font-size: 3rem;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.lightBlue};
  position: relative;
  cursor: pointer;
  transition: background-color 0.25s ease-in, transform 0.25s ease-in;
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.navyBlueHover};
  }
`;

const StyledMainLogo = styled.div`
  background-color: ${({ theme }) => theme.navyBlue};
  width: 60px;
  height: 60px;
  border: 4px solid ${({ theme }) => theme.lightBlue};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.navyBlueHover};
`;

const PageTemplate = ({ children }) => (
  <StyledBoardLayout>
    <StyledMenu>
      <WrapperButton area="logo">
        <StyledMainLogo>
          <FontAwesomeIcon color={theme.lightBlue} icon={faDollarSign} />
        </StyledMainLogo>
      </WrapperButton>
      <WrapperButton area="callendar">
        <ButtonMenu as={NavLink} to={routes.callendar} activeClassName="activeBtn">
          <FontAwesomeIcon color={theme.lightBlue} icon={faCalendarAlt} />
        </ButtonMenu>
      </WrapperButton>
      <WrapperButton area="statistics">
        <ButtonMenu as={NavLink} to={routes.statistics} activeClassName="activeBtn">
          <FontAwesomeIcon color={theme.lightBlue} icon={faChartArea} />
        </ButtonMenu>
      </WrapperButton>
      <WrapperButton area="settings">
        <ButtonMenu as={NavLink} to={routes.settings} activeClassName="activeBtn">
          <FontAwesomeIcon color={theme.lightBlue} icon={faCogs} />
        </ButtonMenu>
      </WrapperButton>
      <WrapperButton area="logout">
        <ButtonMenu as={NavLink} to={routes.settings} activeClassName="activeBtn">
          <FontAwesomeIcon color={theme.lightBlue} icon={faSignOutAlt} />
        </ButtonMenu>
      </WrapperButton>
    </StyledMenu>
    {children}
  </StyledBoardLayout>
);

export default PageTemplate;
