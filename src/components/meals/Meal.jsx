import React, { useContext } from 'react';
import { currencyFormatter } from '../../util/formatting';
import Button from '../UI/Button';
import CartContext from '../../store/Cart';

const Meal = ({ meal }) => {
  const { addItem } = useContext(CartContext);

  const handleAddingItem = () => {
    addItem(meal);
  };

  return (
    <li className="meal-item">
      <article>
        {/* src={`http://localhost:3000/${meal.image}`} */}
        <img src={meal.image} alt={meal.name} />
        <div className="">
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddingItem}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};

export default Meal;
