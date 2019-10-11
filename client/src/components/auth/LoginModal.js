import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  FormGroup,
  Form,
  Label,
  Input,
  NavLink,
  Alert,
} from 'reactstrap';
import { loginAction } from '../../redux/actions/authActions';
import { getErrorMsg } from '../../redux/selectors/errorSelector';
import { cleanErrors } from '../../redux/actions/errorActions';
import { isAuthenticated } from '../../redux/selectors/authSelectors';

const LoginModal = () => {
  const [isOpen, setOpenModal] = useState(false);
  const [form, setFormValue] = useState({ email: '', password: '' });
  const isUserAuthenticated = useSelector(isAuthenticated);
  const msg = useSelector(getErrorMsg);
  const dispatch = useDispatch();

  const toggle = useCallback(() => {
    dispatch(cleanErrors());
    setOpenModal(!isOpen);
  }, [isOpen]);

  const onChangeFormValue = useCallback(
    ({ target: { value, name } }) => {
      setFormValue({ ...form, [name]: value });
    },
    [form],
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginAction(form));
    },
    [form, dispatch, toggle],
  );

  useEffect(() => {
    if (isUserAuthenticated && isOpen) toggle();
  }, [isUserAuthenticated]);

  return (
    <>
      <NavLink color="dark" onClick={toggle} className="my-3">
        Login
      </NavLink>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          {msg && <Alert color="danger"> {msg}</Alert>}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={onChangeFormValue}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={onChangeFormValue}
              />
            </FormGroup>
            <Button type="submit" color="dark">
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoginModal;
