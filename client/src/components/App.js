import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';

import { loadUserAction } from '../redux/actions/authActions';
import Header from './Navbar';
import TodoList from './List';
import ItemModal from './ItemModal';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserAction());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <ItemModal />
      <TodoList />
    </div>
  );
};

export default App;
