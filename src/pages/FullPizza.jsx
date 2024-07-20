import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://66506f00ec9b4a4a60320d7d.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  if (!pizza) {
    return (
      <div className='container'>
        <h3>Загрузка...</h3>
      </div>
    );
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='' />
      <h2>{pizza.title}</h2>
      <h3>{pizza.price} ₽</h3>
    </div>
  );
};

export default FullPizza;
