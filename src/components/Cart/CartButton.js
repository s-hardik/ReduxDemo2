import classes from './CartButton.module.css';
import uiSlice  from '../../store/uiSlice';
import { uiActions } from '../../store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
 const totalQuantity =  useSelector(state => state.cart.totalQuantity)
 const dispatch = useDispatch();
  const toggleCarthandler = ()=> {
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={toggleCarthandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
