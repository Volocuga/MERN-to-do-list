import request from '../../helpers/request';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  GET_ITEMS_REQUEST,
  GET_ITEMS_RESPONSE,
  GET_ITEMS_ERROR,
} from '../types';

export const getAllItemsAction = () => dispatch => {
  dispatch({ type: GET_ITEMS_REQUEST });

  request
    .get('/api/items')
    .then(({ data }) => dispatch({ type: GET_ITEMS_RESPONSE, payload: data }))
    .catch(error => dispatch({ type: GET_ITEMS_ERROR, payload: error }));
};

export const addNewItemAction = item => dispatch => {
  request
    .post('/api/items', item)
    .then(({ data }) => dispatch({ type: ADD_ITEM, payload: data }));
};

export const removeItemAction = id => dispatch => {
  request.delete(`/api/items/${id}`).then(({ data: { status } }) => {
    if (status === 'success') {
      dispatch({ type: REMOVE_ITEM, payload: id });
    }
  });
};
