import { CLEAN_ERRORS, GET_ERRORS } from '../types';

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return {
        msg: payload.msg,
        status: payload.status,
        id: payload.id,
      };

    case CLEAN_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };

    default:
      return state;
  }
};
