import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../redux/selectors/itemSelectors';
import {
  getAllItemsAction,
  removeItemAction,
} from '../redux/actions/itemActions';
import { isAuthenticated } from '../redux/selectors/authSelectors';

const List = () => {
  const dispatch = useDispatch();
  const items = useSelector(getAllItems);
  const isUserAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    dispatch(getAllItemsAction());
  }, [dispatch]);

  const removeItem = id => {
    dispatch(removeItemAction(id));
  };

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="todo-list">
          {items.map(({ _id: id, name }) => (
            <CSSTransition key={id} timeout={500} classNames="item">
              <ListGroupItem>
                {isUserAuthenticated && (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => removeItem(id)}
                  >
                    &times;
                  </Button>
                )}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default List;
