import React from 'react';
import qs from 'qs';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? `desc` : 'asc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios
      .get(
        `https://66506f00ec9b4a4a60320d7d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=4${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setItems([]);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });

    console.log(queryString);
  }, [categoryId, sortType, currentPage]);

  const pizzas =
    items !== 'Not found'
      ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
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
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
