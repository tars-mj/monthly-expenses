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
      category: { id: 2321, label: 'czynsz', value: 'czynsz' },
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
      category: { id: 2321, label: 'czynsz', value: 'czynsz' },
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
      category: { id: 2321, label: 'czynsz', value: 'czynsz' },
      deadline: 12,
      year: [2020],
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      history: [],
      amountExpected: 80,
      status: 'open',
    },
  ],
  categories: [
    { id: 2321, label: 'czynsz', value: 'czynsz' },
    { id: 23331, label: 'hobby', value: 'hobby' },
    { id: 3321, label: 'kredyty', value: 'kredyty' },
    { id: 1233, label: 'multimedia', value: 'multimedia' },
  ],
};

// Constants
const SET_LOADING = 'SET_LOADING';
const ADD_CLOSE_MONTH = 'ADD_CLOSE_MONTH';
const SELECT_MONTH = 'SELECT_MONTH';
const ACCEPT_PAYMENT = 'ACCEPT_PAYMENT';
const SET_SELECTED_YEAR = 'SET_SELECTED_YEAR';
const REMOVE_PAYMENT = 'REMOVE_PAYMENT';
const ADD_PAYMENT = 'ADD_PAYMENT';
const UPDATE_PAYMENT = 'UPDATE_PAYMENT';
const ADD_CATEGORY = 'ADD_CATEGORY';
const EDIT_CATEGORY = 'EDIT_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

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

    case REMOVE_PAYMENT:
      return { ...state, expenses: [...state.expenses.filter((x) => x.id !== action.payload.id)] };
    case ADD_PAYMENT:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case UPDATE_PAYMENT:
      return {
        ...state,
        expenses: [...state.expenses.filter((x) => x.id !== action.payload.id), action.payload],
      };
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case EDIT_CATEGORY:
      return {
        ...state,
        expenses: [
          ...state.expenses.map((x) => {
            if (x.category.id === action.payload.id) {
              x.category.label = action.payload.label;
              x.category.value = action.payload.value;
              return x;
            }
            return x;
          }),
        ],
        categories: [...state.categories.filter((x) => x.id !== action.payload.id), action.payload],
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        expenses: [
          ...state.expenses.map((x) => {
            if (x.category.id === action.payload.id) {
              x.category = { id: 0, value: 'no category', label: 'no category' };
              return x;
            }
            return x;
          }),
        ],
        categories: [...state.categories.filter((x) => x.id !== action.payload.id)],
      };
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

  const removePayment = ({ id }) => {
    dispatch({
      type: REMOVE_PAYMENT,
      payload: {
        id,
      },
    });
  };

  const addPayment = ({
    id,
    name,
    typePayment,
    category,
    deadline,
    year,
    month,
    history = [],
    amountExpected,
    status = 'open',
  }) => {
    dispatch({
      type: ADD_PAYMENT,
      payload: {
        id,
        name,
        typePayment,
        category,
        deadline,
        year,
        month,
        history,
        amountExpected,
        status,
      },
    });
  };

  const updatePayment = ({
    id,
    name,
    typePayment,
    category,
    deadline,
    year,
    month,
    history,
    amountExpected,
    status,
  }) => {
    dispatch({
      type: UPDATE_PAYMENT,
      payload: {
        id,
        name,
        typePayment,
        category,
        deadline,
        year,
        month,
        history,
        amountExpected,
        status,
      },
    });
  };

  const addCategory = ({ id, label, value }) => {
    dispatch({
      type: ADD_CATEGORY,
      payload: {
        id,
        label,
        value,
      },
    });
  };

  const updateCategory = ({ id, label, value }) => {
    dispatch({
      type: EDIT_CATEGORY,
      payload: {
        id,
        label,
        value,
      },
    });
  };

  const removeCategory = ({ id }) => {
    dispatch({
      type: REMOVE_CATEGORY,
      payload: {
        id,
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
        removePayment,
        addPayment,
        updatePayment,
        addCategory,
        updateCategory,
        removeCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
