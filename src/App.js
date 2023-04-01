import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import uiSlice from './store/uiSlice';
import { useEffect } from 'react';
import { response } from 'express';
import Notification from './components/UI/Notification';
import { uiActions } from './store/uiSlice';
function App() {
 const cartIsVisible = useSelector(state => state.ui.cartIsVisible)
 const cart = useSelector(state => state.cart); 
 const notification = useSelector(state => state.ui.notification);
const dispatch  = useDispatch();
 useEffect(()=>{
  const sendCartData = async () =>{
    dispatch(uiActions.showNotification({
      status: 'pending',
      title:'sending....',
      message: 'Sending cart data!'
    }))
  const response = await  fetch('https://react-redux-demo-5df3e-default-rtdb.firebaseio.com/cart.json', {
      method:'PUT',
      body: JSON.stringify(cart),
    });
    if(!response.ok){
      throw new Error('Sending Cart Data failed');
    }

    const responseData = await response.json();
    dispatch(uiActions.showNotification({
      status: 'success',
      title:'success....',
      message: 'Sending cart data done!'
    }))
  }
  sendCartData().catch(error=>{
    dispatch(uiActions.showNotification({
      status: 'error',
      title:'error....',
      message: 'Sending cart data Failed!'
    }))
  })
 },[cart, dispatch]);
 return (
  <>
 { notification && (<Notification status={notification.status}
 title={notification.title}
 message={notification.message} />)}
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
