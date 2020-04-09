import React, { createContext, useReducer, useEffect } from 'react';

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
const initialState = () => {
  return {
    isLoading: false,
    selectedYear: JSON.parse(window.localStorage.getItem('selectedYear')) || currentDate.year,
    selectedMonth: JSON.parse(window.localStorage.getItem('selectedMonth')) || currentDate.month,
    expenses: JSON.parse(window.localStorage.getItem('expenses')) || [],
    categories: JSON.parse(window.localStorage.getItem('categories')) || [],
  };
};

const exampleData = {
  isLoading: false,
  selectedYear: 2020,
  selectedMonth: 4,
  expenses: [
    {
      id: 662122,
      name: 'Rata kredytu za mieszkanie',
      typePayment: 'manual',
      category: { id: 324234324, name: 'czynsz' },
      deadline: 14,
      year: [2020],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      history: [{ year: 2020, month: 2, status: 'paid', amount: 1100 }],
      amountExpected: 1200,
      status: 'open',
    },
  ],
  categories: [
    { id: 2321, name: 'czynsz' },
    { id: 23331, name: 'hobby' },
    { id: 3321, name: 'kredyty' },
    { id: 1233, name: 'multimedia' },
  ],
};

// Constants
const SET_LOADING = 'SET_LOADING';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };

    default:
      throw new Error();
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState());

  // Actions
  const setLoading = ({ isLoading }) => dispatch({ type: SET_LOADING, payload: { isLoading } });

  useEffect(() => {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('selectedYear', JSON.stringify(state.selectedYear));
      window.localStorage.setItem('selectedMonth', JSON.stringify(state.selectedMonth));
      window.localStorage.setItem('expenses', JSON.stringify(state.expenses));
      window.localStorage.setItem('categories', JSON.stringify(state.categories));
    }
  }, [state.selectedYear, state.selectedMonth, state.expenses, state.categories]);

  return (
    <DataContext.Provider
      value={{
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        expenses: state.expenses,
        categories: state.categories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
