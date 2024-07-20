import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SelectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(SelectPizzaData);
  const sortType = sort.sortProperty;

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? `desc` : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const pizzas =
    items !== 'Not found'
      ? items
          .filter((el) =>
            el.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj) => <PizzaBlock key={obj.id} {...obj} />)
      : [];
  const skeletons = [...new Array(8)].map((elem, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
