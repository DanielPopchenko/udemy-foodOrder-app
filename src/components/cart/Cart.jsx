import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart';
import UserProgressContext from '../../store/UserProgress';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import CartItem from './CartItem';

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  console.log('items inside cart comp: ', items);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  const handleCloseCart = () => {
    hideCart();
  };

  const handleOpenCheckout = () => {
    showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={progress === 'cart'}
      onClose={progress === 'cart' ? handleCloseCart : null}
    >
      <ul>
        {items.map((item) => {
          console.log(item.id);
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => addItem(item)}
              onDecrease={() => removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>

        {items.length > 0 && <Button onClick={handleOpenCheckout}>Go to checkout</Button>}
      </p>
    </Modal>
  );
};

export default Cart;
