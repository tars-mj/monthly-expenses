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
// const initialState = () => {
//   return {
//     isLoading: false,
//     selectedYear: JSON.parse(window.localStorage.getItem('selectedYear')) || currentDate.year,
//     selectedMonth: JSON.parse(window.localStorage.getItem('selectedMonth')) || currentDate.month,
//     expenses: JSON.parse(window.localStorage.getItem('expenses')) || [],
//     categories: JSON.parse(window.localStorage.getItem('categories')) || [],
//   };
// };

const initialState = {
  isLoading: false,
  selectedYear: 2020,
  selectedMonth: 4,
  monthsClosed: [
    { year: 2020, month: 1 },
    { year: 2020, month: 2 },
    { year: 2020, month: 3 },
  ],
  expenses: [
    {
      id: 6621232,
      name: 'Rata kredytu za mieszkanie',
      typePayment: 'manual',
      category: { id: 324234324, name: 'czynsz' },
      deadline: 12,
      year: [2020],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      history: [{ year: 2020, month: 4, status: 'completed', amount: 1100 }],
      amountExpected: 1200,
      status: 'open',
    },
    {
      id: 662233122,
      name: 'Leasing',
      typePayment: 'manual',
      category: { id: 324234324, name: 'czynsz' },
      deadline: 12,
      year: [2020],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      history: [],
      amountExpected: 1200,
      status: 'open',
    },
    {
      id: 662122,
      name: 'Opłata za szkołę',
      typePayment: 'auto',
      category: { id: 324234324, name: 'czynsz' },
      deadline: 12,
      year: [2020],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      history: [],
      amountExpected: 80,
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
const ADD_CLOSE_MONTH = 'ADD_CLOSE_MONTH';
const SELECT_MONTH = 'SELECT_MONTH';
const ACCEPT_PAYMENT = 'ACCEPT_PAYMENT';
const SET_SELECTED_YEAR = 'SET_SELECTED_YEAR';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case ADD_CLOSE_MONTH:
      return { ...state, monthsClosed: [...state.monthsClosed, action.payload] };
    case SELECT_MONTH:
      return { ...state, selectedMonth: action.payload.month };
    case ACCEPT_PAYMENT:
      console.log(action.payload);
      return {
        ...state,
        expenses: [
          ...state.expenses.map((ex) => {
            if (ex.id === action.payload.id) {
              ex.history.push({
                year: action.payload.year,
                month: action.payload.month,
                status: action.payload.status,
                amount: action.payload.amount,
              });
              return ex;
            }
            return ex;
          }),
        ],
      };
    case SET_SELECTED_YEAR:
      return { ...state, selectedYear: action.payload.year };
    default:
      throw new Error();
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const setLoading = ({ isLoading }) => dispatch({ type: SET_LOADING, payload: { isLoading } });

  const addCloseMonth = ({ month, year }) => {
    dispatch({
      type: ADD_CLOSE_MONTH,
      payload: {
        year,
        month,
      },
    });
  };

  const selectMonth = ({ month }) => {
    dispatch({
      type: SELECT_MONTH,
      payload: {
        month,
      },
    });
  };

  const acceptPayment = ({ id, year, month, status, amount }) => {
    dispatch({
      type: ACCEPT_PAYMENT,
      payload: {
        id,
        year,
        month,
        status,
        amount,
      },
    });
  };

  const setSelectedYear = ({ year }) => {
    dispatch({
      type: SET_SELECTED_YEAR,
      payload: {
        year,
      },
    });
  };

  useEffect(() => {
    // if (typeof window.localStorage !== 'undefined') {
    //   window.localStorage.setItem('selectedYear', JSON.stringify(state.selectedYear));
    //   window.localStorage.setItem('selectedMonth', JSON.stringify(state.selectedMonth));
    //   window.localStorage.setItem('expenses', JSON.stringify(state.expenses));
    //   window.localStorage.setItem('categories', JSON.stringify(state.categories));
    // }
  }, [state.selectedYear, state.selectedMonth, state.expenses, state.categories]);

  return (
    <DataContext.Provider
      value={{
        monthsClosed: state.monthsClosed,
        selectedYear: state.selectedYear,
        selectedMonth: state.selectedMonth,
        expenses: state.expenses,
        categories: state.categories,
        addCloseMonth,
        selectMonth,
        acceptPayment,
        setSelectedYear,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
