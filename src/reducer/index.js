import {
  SET_LOADING,
  ADD_CLOSE_MONTH,
  SELECT_MONTH,
  ACCEPT_PAYMENT,
  SET_SELECTED_YEAR,
  REMOVE_PAYMENT,
  ADD_PAYMENT,
  UPDATE_PAYMENT,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
} from '../constants';

// Reducer
export const reducer = (state, action) => {
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
