import Header from './components/header/Header';
import Meals from './components/meals/Meals';
import { CartContextProvider } from './store/Cart';

const App = () => {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
};

export default App;
