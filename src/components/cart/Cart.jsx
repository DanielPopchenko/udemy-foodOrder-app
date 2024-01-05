import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart';
import UserProgressContext from '../../store/UserProgress';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import CartItem from './CartItem';

const Cart = () => {
  const { items } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  const handleCloseCart = () => {
    hideCart();
  };

  return (
    <Modal className="cart" open={progress === 'cart'}>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
