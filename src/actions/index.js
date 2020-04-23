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

export const setLoading = (dispatch) => ({ isLoading }) =>
  dispatch({ type: SET_LOADING, payload: { isLoading } });

export const addCloseMonth = (dispatch) => ({ month, year }) => {
  dispatch({
    type: ADD_CLOSE_MONTH,
    payload: {
      year,
      month,
    },
  });
};

export const selectMonth = (dispatch) => ({ month }) => {
  dispatch({
    type: SELECT_MONTH,
    payload: {
      month,
    },
  });
};

export const acceptPayment = (dispatch) => ({ id, year, month, status, amount }) => {
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

export const setSelectedYear = (dispatch) => ({ year }) => {
  dispatch({
    type: SET_SELECTED_YEAR,
    payload: {
      year,
    },
  });
};

export const removePayment = (dispatch) => ({ id }) => {
  dispatch({
    type: REMOVE_PAYMENT,
    payload: {
      id,
    },
  });
};

export const addPayment = (dispatch) => ({
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

export const updatePayment = (dispatch) => ({
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

export const addCategory = (dispatch) => ({ id, label, value }) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: {
      id,
      label,
      value,
    },
  });
};

export const updateCategory = (dispatch) => ({ id, label, value }) => {
  dispatch({
    type: EDIT_CATEGORY,
    payload: {
      id,
      label,
      value,
    },
  });
};

export const removeCategory = (dispatch) => ({ id }) => {
  dispatch({
    type: REMOVE_CATEGORY,
    payload: {
      id,
    },
  });
};
