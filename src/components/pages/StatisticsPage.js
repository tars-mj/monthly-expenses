import React, { useContext } from 'react';
import PageTemplate from '../templates/PageTemplate';
import {
  StyledWrapperPage,
  StyledTop,
  StyledHeader,
  StyledContent,
} from '../moleculs/StyledPageElements';
import MyResponsiveBar from '../organisms/MyResponsiveBar';
import { months } from '../../utils/months';
import { DataContext } from '../../context/DataContext';

const StatisticsPage = () => {
  const { categories, expenses, selectedYear } = useContext(DataContext);

  const parseData = () => {
    // first - create object with structure needed to nivo bar
    let data = [];
    let parseCategories = categories.map((x) => ({
      [x.label]: 0,
      [`${x.label}Color`]: 'hsl(86, 70%, 50%)',
    }));
    parseCategories = Object.assign(...parseCategories);
    months.forEach((x) => data.push({ month: x.value }));
    data = data.map((x) => ({ month: x.month, ...parseCategories }));

    // second - parse my data and push it into above object
    data.map((x) => {
      expenses.forEach((e) => {
        //for auto payment
        if (e.typePayment === 'auto') {
          if (e.month.includes(x.month)) {
            for (let key in x) {
              if (key === e.category.label) {
                x[key] += e.amountExpected;
              }
            }
          }
        }

        //for manual payment
        e.history.forEach((y) => {
          if (x.month === y.month && y.year === selectedYear) {
            for (let key in x) {
              if (key === e.category.label) {
                x[key] += parseFloat(y.amount);
              }
            }
          }
        });
      });
    });

    return data;
  };

  return (
    <PageTemplate>
      <StyledWrapperPage>
        <StyledTop>
          <StyledHeader>
            <div>Payment</div>
            <div>Statistics</div>
          </StyledHeader>
          <div></div>
        </StyledTop>
        <StyledContent>
          <MyResponsiveBar data={parseData()} keys={categories.flatMap((x) => x.label)} />
        </StyledContent>
      </StyledWrapperPage>
    </PageTemplate>
  );
};

export default StatisticsPage;
