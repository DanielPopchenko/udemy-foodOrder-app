import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Header from './components/header/Header';
import Meals from './components/meals/Meals';
import { UserProgressContextProvider } from './store/UserProgress';
import { CartContextProvider } from './store/cart';
import './App.css';

const App = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />

        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};

export default App;
