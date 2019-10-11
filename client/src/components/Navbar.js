import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import {
  isAuthenticated,
  userSelector,
} from '../redux/selectors/authSelectors';

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const isUserAuthenticated = useSelector(isAuthenticated);
  const user = useSelector(userSelector);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const authLinks = (
    <>
      <NavItem>
        <h3 className="my-3">{user ? `Welcome ${user.name}` : ''}</h3>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const publicLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <header>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand>ShoppingList</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="ml-auto">
              {isUserAuthenticated ? authLinks : publicLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
