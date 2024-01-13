import { useFetch } from '../../hooks/useFetch';
import Error from '../error/Error';
import Meal from './Meal';

// ! Not to enter inf loop and recreate this object tonns of times
// ! it is create only once
const configObject = {};

const Meals = () => {
  const {
    data: meals,
    isLoading,
    error,
  } = useFetch('http://localhost:3000/meals', configObject, []);

  if (isLoading) {
    return <p className="center">Meals are loading...!</p>;
  }

  // ! If we have an error this component should be returned
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
