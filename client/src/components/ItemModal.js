import React, { useState, useCallback } from 'react';
import {
  Modal,
  ModalHeader,
  Button,
  Container,
  ModalBody,
  FormGroup,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemAction } from '../redux/actions/itemActions';
import { isAuthenticated } from '../redux/selectors/authSelectors';

const ItemModal = () => {
  const [isOpen, setOpenModal] = useState(false);
  const [name, setName] = useState(null);
  const dispatch = useDispatch();
  const isUserAuthenticated = useSelector(isAuthenticated);

  const toggle = useCallback(() => {
    setOpenModal(!isOpen);
  }, [isOpen]);

  const handleOnChange = useCallback(({ target: { value } }) => {
    setName(value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(addNewItemAction({ name }));
      toggle();
    },
    [name, dispatch, toggle],
  );

  return (
    <Container>
      {isUserAuthenticated && (
        <Button color="dark" onClick={toggle} className="my-3">
          Create
        </Button>
      )}

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Add new item</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                onChange={handleOnChange}
              />
            </FormGroup>
            <Button type="submit" color="dark">
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default ItemModal;
