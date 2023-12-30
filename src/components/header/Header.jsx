import React, { useContext } from 'react';
import logo from '../../assets/logo.jpg';
import Button from '../UI/Button';
import CartContext from '../../store/Cart';

const Header = () => {
  const { items } = useContext(CartContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  console.log(items);

  return (
    <header id="main-header">
      <div id="title">
        <h1>ReactFood</h1>
        <img src={logo} alt="" />
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
};

export default Header;
