import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((element, index) => {
          return (
            <li
              key={element}
              onClick={() => setActiveIndex(index)}
              className={activeIndex === index ? 'active' : ''}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
