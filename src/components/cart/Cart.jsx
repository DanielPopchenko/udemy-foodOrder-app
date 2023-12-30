import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/Cart';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';

const Cart = () => {
  const { items } = useContext(CartContext);
  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );
  return (
    <Modal className="cart">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>
              {item.name} - {item.quantity}
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly>Close</Button>
        <Button textOnly>Go to checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
