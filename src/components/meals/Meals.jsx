import React, { useEffect, useState } from 'react';
import Meal from './Meal';

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        console.log('error');
        return;
      }

      const fetchedMeals = await response.json();
      console.log(fetchedMeals);
      setMeals(fetchedMeals);
    };

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
