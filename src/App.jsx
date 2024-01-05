import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Meals from './components/meals/Meals';
import { UserProgressContextProvider } from './store/UserProgress';
import { CartContextProvider } from './store/cart';

const App = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};

export default App;
