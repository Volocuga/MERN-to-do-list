import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../types';
import { getErrorsAction } from './errorActions';
import request from '../../helpers/request';

export const loadUserAction = () => dispatch => {
  dispatch({ type: USER_LOADING });

  request
    .get('api/auth/user')
    .then(({ data }) => dispatch({ type: USER_LOADED, payload: data }))
    .catch(({ response: { data, status } }) => {
      dispatch({ type: AUTH_ERROR });
      dispatch(getErrorsAction(data, status));
    });
};

export const registerAction = formValues => dispatch => {
  request
    .post('api/users', JSON.stringify(formValues))
    .then(({ data }) => dispatch({ type: REGISTER_SUCCESS, payload: data }))
    .catch(({ response: { data, status } }) => {
      dispatch(getErrorsAction(data, status));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const loginAction = formValues => dispatch => {
  request
    .post('api/auth', JSON.stringify(formValues))
    .then(({ data }) => dispatch({ type: LOGIN_SUCCESS, payload: data }))
    .catch(({ response: { data, status } }) => {
      dispatch(getErrorsAction(data, status));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logoutAction = () => ({ type: LOGOUT_SUCCESS });
