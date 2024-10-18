import React, { useState } from 'react';
import './header.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const catalogData = [
  {
    title: "Двигатель",
    subcategories: [
      {
        title: "Блок цилиндров",
        items: [
          "Блоки",
          "Валы коленчатые",
          "Вкладыши",
          "Кольца поршневые",
          "Маховики",
          "Поршни",
          "Шатуны",
          "Шкив коленвала",
          "Прочее: блок цилиндров"
        ]
      },
      {
        title: "Головка блока",
        items: [
          "Валы распределительные",
          "Гидрокомпенсаторы",
          "Головка блока цилиндров",
          "Колпачки маслосъемные",
          "Крышки ГБЦ",
          "Прочее: головка блока"
        ]
      },
      {
        title: "ГРМ",
        items: [
   "Прочее: ГРМ",
          "Ролики",
          "Цепи",
          "Ремкомплекты ГРМ"
        ]
      },
    ]
  },
  {
    title: "Крепеж",
    subcategories: [
      "Болты",
      "Винты",
      "Втулки",
      "Гайки",
      "Заклепки",
      "Заглушки",
      "Клипсы",
      "Кронштейны",
      "Наборы крепежа",
      "Саморезы",
      "Скобы",
      "Фланец",
      "Хомуты",
      "Шайбы",
      "Шпильки",
      "Шпонки",
      "Штифты",
      "Стопорные кольца",
      "Шплинты"
    ]
  },
  {
    title: "Кузовные запчасти",
    subcategories: [
      {
        title: "Бамперы и принадлежности",
        items: ["Бамперы", "Детали бампера"]
      },
      "Брызговики, фартуки",
      {
        title: "Двери и принадлежности",
        items: [
          "Двери",
          "Автомобильные ручки на двери",
          "Детали дверей",
          "Ручки стеклоподъёмников"
        ]
      },
      "Детали багажника",
      "Амортизаторы крышки багажника",
      "Зеркала автомобильные",
      {
        title: "Капоты и принадлежности",
        items: ["Детали капота", "Капоты"]
      },
      "Компоненты внутреннего оборудования салона",
      "Крылья",
      "Уплотнители для дверей, стекол, капота",
      "Лонжероны",
      "Полы и крыши",
      "Пороги",
      "Прочее: кузовные детали",
      "Решетки радиатора",
      "Амортизаторы капота",
      "Воздуховоды"
    ]
  },
];
export default function Header() {
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const user = useSelector(state => state.user[0]);
  const totalPrice = useSelector(state => state.price);

  const toggleCatalog = () => {
      setCatalogOpen(!isCatalogOpen);
  };
    
    return (
      <header className="header">
          <div className="logo">
            <NavLink to='/'>  
              <img src="../../public/img/Screenshot_103 (1).png" alt="Логотип" />
            </NavLink>
          </div>
          <div className="link_wrapper">
              <div className='wrapper-text' onClick={toggleCatalog}>
                  Каталог
                  <div className={`icon ${isCatalogOpen ? 'active' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                          <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z"/>
                      </svg>
                  </div>
              </div>
              {isCatalogOpen && (
                  <div className="catalog-dropdown">
                      {catalogData.map((category, idx) => (
                          <div key={idx} className="catalog-category">
                              <h3 className='category-title'>{category.title}</h3>
                              {Array.isArray(category.subcategories) && category.subcategories.map((sub, subIdx) => (
                                  typeof sub === 'string' ? (
                                      <p key={subIdx} className="subcategory-text">
                                          {sub}
                                      </p>
                                  ) : (
                                      <div key={subIdx} className="subcategory-group">
                                          <p className="subcategory-group-title">{sub.title}</p>
                                          <ul>
                                              {sub.items.map((item, itemIdx) => (
                                                  <li key={itemIdx} className="subcategory-item">
                                                      {item}
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  )
                              ))}

                          </div>
                      ))}
                      <div className="catalog-category">
                          <NavLink 
                              to='/armotisers' 
                              className="subcategory-link" 
                              activeClassName="active-link"
                              onClick={toggleCatalog}
                          >
                              Амортизаторы
                          </NavLink>
                      </div>
                  </div>
              )}
          </div>
          <div className="header-input">
              <input 
                  type="text" 
                  placeholder="Поиск по артикулу или наименованию" 
              />
          </div>
          <div className="header-nav">
              <NavLink to="/" exact activeClassName="active-nav">
                  <p>Главная</p>
              </NavLink>
              <NavLink to="/about" activeClassName="active-nav">
                  <p>О нас</p>
              </NavLink>
              <NavLink to="/contacts" activeClassName="active-nav">
                  <p>Контакты</p>
              </NavLink>
          </div>
          <div className="header-auth">
              {!user ? (
                  <>
                      <button className='auth-btn'><NavLink to='/register'>Регистрация</NavLink></button>
                      <button className='auth-btn'><NavLink to='/login'>Вход</NavLink></button>
                  </>
              ) : (
                  <>
                      <NavLink className='header-bascket flex' to='/basket'>🛒<h3 className='backet-text'>Корзина <br /> ({totalPrice} руб.)</h3></NavLink>
                      <button className='auth-btn'>
                          <NavLink to='/dashboard'>{user.name === 'admin' ? 'Панель администратора' : 'Личный кабинет'}</NavLink>
                      </button>
                  </>
              )}
          </div>
      </header>
  )
}