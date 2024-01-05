import React from 'react';

const CartItem = ({ item }) => {
  return (
    <li key={item.id} className="cart-item">
      <p>
        {item.name} - {item.quantity}
      </p>
    </li>
  );
};

export default CartItem;
