import { CLEAN_ERRORS, GET_ERRORS } from '../types';

export const getErrorsAction = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: {
    msg,
    status,
    id,
  },
});

export const cleanErrors = () => ({ type: CLEAN_ERRORS });
