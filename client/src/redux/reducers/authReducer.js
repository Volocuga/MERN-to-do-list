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

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
};
