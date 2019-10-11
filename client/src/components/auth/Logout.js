import React from 'react';
import NavLink from 'reactstrap/es/NavLink';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <NavLink color="dark" onClick={logout} className="my-3">
      Logout
    </NavLink>
  );
};

export default Logout;
