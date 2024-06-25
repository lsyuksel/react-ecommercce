import { useEffect } from 'react';
import Header from './components/Header'
import Router from './router/Router'

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getAllProduct } from './redux/slices/productsSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Router />
        <ToastContainer stacked />
      </main>
    </>
  )
}

export default App
