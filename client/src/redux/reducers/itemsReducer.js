import uuid from 'uuid';
import {
  GET_ITEMS_REQUEST,
  ADD_ITEM,
  REMOVE_ITEM,
  GET_ITEMS_RESPONSE,
  GET_ITEMS_ERROR,
} from '../types';

const initialState = {
  data: [],
  isLoading: false,
  error: false,
};

const itemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_ITEMS_RESPONSE:
      return {
        ...state,
        data: [...payload],
        isLoading: false,
      };

    case GET_ITEMS_ERROR:
      return {
        ...state,
        error: true,
      };

    case ADD_ITEM:
      return {
        ...state,
        data: [...state.data, payload],
      };

    case REMOVE_ITEM:
      return {
        ...state,
        data: state.data.filter(({ _id }) => _id !== payload),
      };

    default:
      return state;
  }
};

export default itemsReducer;
