import React, { createContext, useReducer, useEffect } from 'react';
import { sampleData } from '../utils/sampleData';
import { reducer } from '../reducer';
import {
  addCloseMonth,
  selectMonth,
  acceptPayment,
  setSelectedYear,
  removePayment,
  addPayment,
  updatePayment,
  addCategory,
  updateCategory,
  removeCategory,
} from '../actions';

export const DataContext = createContext();

const getCurrentTime = () => {
  const date = new Date();

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
};

const currentDate = getCurrentTime();

// Initial state
export const initialState = () => {
  if (JSON.parse(window.localStorage.getItem('selectedYear')) === null) {
    return sampleData;
  }
  return {
    isLoading: false,
    selectedYear: JSON.parse(window.localStorage.getItem('selectedYear')),
    selectedMonth: JSON.parse(window.localStorage.getItem('selectedMonth')),
    expenses: JSON.parse(window.localStorage.getItem('expenses')) || [],
    categories: JSON.parse(window.localStorage.getItem('categories')) || [],
    monthsClosed: JSON.parse(window.localStorage.getItem('monthsClosed')) || [],
  };
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('selectedYear', JSON.stringify(state.selectedYear));
      window.localStorage.setItem('selectedMonth', JSON.stringify(state.selectedMonth));
      window.localStorage.setItem('expenses', JSON.stringify(state.expenses));
      window.localStorage.setItem('categories', JSON.stringify(state.categories));
      window.localStorage.setItem('monthsClosed', JSON.stringify(state.monthsClosed));
    }
  }, [
    state.selectedYear,
    state.selectedMonth,
    state.expenses,
    state.categories,
    state.monthsClosed,
  ]);

  return (
    <DataContext.Provider
      value={{
        monthsClosed: state.monthsClosed,
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        expenses: state.expenses,
        categories: state.categories,
        addCloseMonth: addCloseMonth(dispatch),
        selectMonth: selectMonth(dispatch),
        acceptPayment: acceptPayment(dispatch),
        setSelectedYear: setSelectedYear(dispatch),
        removePayment: removePayment(dispatch),
        addPayment: addPayment(dispatch),
        updatePayment: updatePayment(dispatch),
        addCategory: addCategory(dispatch),
        updateCategory: updateCategory(dispatch),
        removeCategory: removeCategory(dispatch),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
