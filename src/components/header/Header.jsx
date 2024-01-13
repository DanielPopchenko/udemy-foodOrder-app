import React, { useContext } from 'react';
import logo from '../../assets/logo.jpg';
import Button from '../UI/Button';
import CartContext from '../../store/cart';
import UserProgressContext from '../../store/UserProgress';

const Header = () => {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  const handleShowCart = () => {
    showCart();
  };

  return (
    <header id="main-header">
      <div id="title">
        <h1>ReactFood</h1>
        <img src={logo} alt="" />
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
