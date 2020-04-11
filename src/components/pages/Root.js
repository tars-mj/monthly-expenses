import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CallendarPage from './CallendarPage';
import SettingsPage from './SettingsPage';
import StatisticsPage from './StatisticsPage';
import { routes } from '../../routes';
import MainTemplate from '../templates/MainTemplate';
import DataProvider from '../../context/DataContext';

const Root = () => (
  <DataProvider>
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} render={() => <Redirect to={routes.callendar} />} />
          <Route exact path={routes.callendar} component={CallendarPage} />
          <Route exact path={routes.statistics} component={StatisticsPage} />
          <Route exact path={routes.settings} component={SettingsPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  </DataProvider>
);

export default Root;
