import { useEffect, useState } from 'react';
import './products.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasket } from '../../store/slices/userSlice';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [quantity, setQuantity] = useState({})
    const user = useSelector(state => state.user[0]);
    const dispatch = useDispatch();
    console.log(user);
    
    
    useEffect(() => {
        axios.get('/data.json')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Ошибка при загрузке данных:', err);
                setError('Не удалось загрузить данные. Пожалуйста, попробуйте позже.');
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(product => {
        const article = String(product.арктикул || '');
        const name = typeof product.наименование === 'string' ? product.наименование.toLowerCase() : '';
        const search = searchTerm.toLowerCase();

        return name.includes(search) || article.includes(search);
    });

    if (loading) {
        return (
            <section>
                <div className="products">
                    <h1 className="products-name">Наши товары:</h1>
                    <div className="loading">Loading...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <div className="products">
                    <h1 className="products-name">Наши товары:</h1>
                    <p className="error">{error}</p>
                </div>
            </section>
        );
    }

    const handleQuantityChange = (event, article) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setQuantity(prev => ({
                ...prev,
                [article]: value ? parseInt(value) : 1 
            }));
        }
    };

    const handleClick = (item) => {
        const qty = quantity[item.арктикул] || 1; 
        alert(`Товар "${item.наименование}" успешно добавлен в корзину, количество: ${qty}`);
        axios.post(`http://89.169.39.144:4444/addBasket/${user._id}`, { item, qty })
            .then(res => {
                console.log(res.data);
                dispatch(updateBasket(res.data));
            })
            .catch(err => console.log(err));
    };

    return (
        <section>
            <div className="products">
                <h1 className="products-name">Наши товары:</h1>
                <div className="products-serch-input">
                    <input 
                        type="text" 
                        placeholder="Поиск по артикулу или наименованию" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="search-input"
                    />
                </div>
                {filteredProducts.length === 0 ? (
                    <p>Нет доступных товаров.</p>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map(product => {
                            const productQty = quantity[product.арктикул] || 1; 
                            const totalPrice = product.цена * productQty; 
                            
                            return (
                                <div key={product.арктикул} className="product-card">
                                    <div className="product-image-container">
                                        {product.фото ? (
                                            <img
                                                src={product.фото.trim()}
                                                alt={product.наименование}
                                                className="product-image"
                                                onError={(e) => { e.target.src = '/default-image.jpg'; }}
                                            />
                                        ) : (
                                            <img
                                                src="/default-image.jpg"
                                                alt="Изображение не доступно"
                                                className="product-image"
                                            />
                                        )}
                                    </div>
                                    <div className="product-details">
                                        <h2 className="product-name"><strong>{product.наименование}</strong></h2>
                                        <p className="product-article">Артикул: {product.арктикул}</p>
                                        <p className="product-price">Цена: {totalPrice} руб.</p>
                                  
                                        {user ? (
                                                         <div className="quantity-container">
                                                         <button 
                                                             className="quantity-button" 
                                                             onClick={() => setQuantity(prev => ({ ...prev, [product.арктикул]: Math.max((prev[product.арктикул] || 1) - 1, 1) }))}>
                                                             -
                                                         </button>
                                                         <input 
                                                             type="number" 
                                                             className="quantity-input" 
                                                             value={productQty} 
                                                             onChange={(e) => handleQuantityChange(e, product.арктикул)} 
                                                             min="1" 
                                                         />
                                                         <button 
                                                             className="quantity-button" 
                                                             onClick={() => setQuantity(prev => ({ ...prev, [product.арктикул]: (prev[product.арктикул] || 1) + 1 }))}>
                                                             +
                                                         </button>
                                                     </div>
                                        ) : ''}
                        
                                        {user ? (
                                            <button onClick={() => handleClick(product)} className='product-btn'>Купить</button>
                                        ) : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
