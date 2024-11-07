import axios from "axios"; 
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import './Armotisers.css';

export default function Armotisers() {
    const [products, setProducts] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [selectedMaker, setSelectedMaker] = useState('завод');
    const [img, setImg] = useState('https://avatars.mds.yandex.net/get-goods_pic/9237130/hat7976556fa23bc6b2233be85a3ef610e8/500x500');
    const [price, setPrice] = useState(500);
    const [quantity, setQuantity] = useState({});
    const [currentSlide, setCurrentSlide] = useState(0);
    const user = useSelector(state => state.user[0]);
    const dispatch = useDispatch();
    const [search , setSearch ] = useState(false)
    const cars = [
        { name: '2001-2007', img: 'https://avatars.mds.yandex.net/i?id=e0be1c368aba1aa233177929174f10b2_l-8497406-images-thumbs&n=13' },
        { name: '2008-2009', img: 'https://33sport.ru/upload/medialibrary/1cf/vaz_2108.jpg' },
        { name: '2110-2112', img: 'https://avatars.mds.yandex.net/i?id=7e56534c9c01e7fcd0e4225bf99df05b1ddf191a-10310451-images-thumbs&n=13' },
        { name: '2114', img: 'https://avatars.mds.yandex.net/get-autoru-vos/4383474/631f35448685933551aff18a8a98a2b9/1200x900' },
        { name: '2115', img: 'https://avatars.mds.yandex.net/i?id=46b040f2197da5d606c42f4f6bba3ecc_l-3925790-images-thumbs&n=13' },
        { name: '2170', img: 'https://i.trse.ru/2024/04/rK86.jpg' },
        { name: '2190', img: 'https://avatars.mds.yandex.net/get-autoru-vos/4387000/23cab59e1d171f6797c3e145398c28dc/1200x900' },
        { name: '1111', img: 'https://scalebay.ru/uploads/user/a/l/alexlol_5799/1-(126).jpg' },
        { name: '21099', img: 'https://cdnb.artstation.com/p/assets/images/images/003/257/679/medium/-99-17.jpg?1471734193' },
        { name: '2121', img: 'https://kolesa-uploads.ru/-/be6da56f-7c98-4f38-85e3-8d70dfb61fc6/313725c42eab88bf0a540e9a82cc1ab2.jpg' },
        { name: '2123', img: 'https://avatars.mds.yandex.net/i?id=1a9714a62c11628a2182b92fc2e95d861a6a14be-4589919-images-thumbs&n=13' }
    ];
    const handleQuantityChange = (event, article) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setQuantity(prev => ({
                ...prev,
                [article]: value ? parseInt(value) : 1 // Default to 1 if empty
            }));
        }
    };
    useEffect(() => {
        axios.get('/armotisers.json')
            .then(res => setProducts(res.data));
    }, []);

    useEffect(() => {
        switch (selectedMaker) {
            case 'HOFER HF':
                setImg('https://b2motor.ru/upload/iblock/a8d/a8d21beb982e705561a01672aea8ab4d.jpg');
                setPrice(450);
                break;
            case 'завод':
                setImg('https://cdn1.ozone.ru/s3/multimedia-f/6487353795.jpg');
                setPrice(800);
                break;
            default:
                setImg('https://avatars.mds.yandex.net/get-goods_pic/9237130/hat7976556fa23bc6b2233be85a3ef610e8/500x500');
        }
    }, [selectedMaker]);

    if (redirect) {
        return <Navigate to='/cell' />;
    }

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % cars.length); 
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + cars.length) % cars.length);
    };

    const handleClick = (item) => {
        const qty = Math.max(4, quantity[item.арктикул] || 1); // Минимум 3 единицы товара
        alert(`Товар "${item.наименование}" успешно добавлен в корзину, количество: ${qty}`);
        axios.post(`http://89.169.39.144:4444/addBasket/${user._id}`, { item, qty })
            .then(res => {
                console.log(res.data);
                dispatch(updateBasket(res.data));
            })
            .catch(err => console.log(err));
    };
    

    const displayedCars = cars.slice(currentSlide, currentSlide + 5).concat(cars.slice(0, Math.max(0, (currentSlide + 5) - cars.length)));

    return (
        <div className="armotisers products">
            <h1 className="products-name">Амортизаторы</h1>
            
  
            <div className="slider-container">
                <button className="slider-button" onClick={handlePrevSlide}>❮</button>
                <div className="cars-container">
                    {displayedCars.map((car, index) => (
                        <div key={index} className="car-card" onClick={()=>{
                            setSearch(!search)
                        }}>
                                   <p className="car-txt">{car.name}</p>
                            <img src={car.img} alt={car.name} className="car-image" style={{width: '200px' , maxHeight : '120px'}} />
                     
                        </div>
                    ))}
                </div>
                <button className="slider-button" onClick={handleNextSlide}>❯</button>
            </div>

            <div className="products-grid">
                <div className="product-card">
                    <div className="product-image-container">
                        <img className="product-image" src={img} alt="Product"  onClick={()=>setRedirect(true)}/>
                    </div>
                    <div className="product-details">
                        <h2 className="product-name">Амортизатор передн. 2101 {selectedMaker}</h2>
                        <p className="product-article">Артикул: 26262</p>
                        <p className="product-price">Цена: {price} </p>
                      
                        <select 
                            onChange={(e) => setSelectedMaker(e.target.value)} 
                            className="product-select"
                        >
                            <option value="" disabled selected>Производитель</option>
                            <option value="завод">Завод</option>
                            <option value="HOFER HF">HOFER HF</option>
                            <option value="никон">Никон</option>
                        </select>
                        {user ? (
                                                         <div className="quantity-container">
                                                         <button 
                                                             className="quantity-button" 
                                                             onClick={() => setQuantity(prev => ({ ...prev, 26262 : Math.max((prev[26262] || 1) - 1, 1) }))}>
                                                             -
                                                         </button>
                                                         <input 
                                                             type="number" 
                                                             className="quantity-input" 
                                                             value={quantity[26262] || 1}
                                                             onChange={(e) => handleQuantityChange(e, product.арктикул)} 
                                                             min="1" 
                                                         />
                                                         <button 
                                                             className="quantity-button" 
                                                             onClick={() => setQuantity(prev => ({ ...prev, '26262': (prev['26262'] || 1) + 1 }))}>
                                                             +
                                                         </button>
                                                     </div>
                                        ) : ''}
                     
                        {user ? (
                            <button 
    onClick={() => handleClick({
        фото: img,
        арктикул: 26262,
        наименование: 'Амортизатор передн. 2101',
        цена: price,
        quantity: Math.max(3, quantity['26262'] || 1) // Гарантированно передаём 3 или больше
    })} 
    className="product-btn"
>
    Купить
</button>

                        ) : ''}
                    </div>
                </div>

                {search ? '' :  products.map((product) =>  {  
                     const productQty = quantity[product.арктикул] || 1; 
                    return (
                    <div key={product.арктикул} className="product-card">
                        <div className="product-image-container">
                            <img
                                src={product.фото}
                                alt={product.наименование}
                                className="product-image"
                                onError={(e) => { e.target.src = '/default-image.jpg'; }}
                            />
                        </div>
                        <div className="product-details">
                            <h2 className="product-name">{product.наименование}</h2>
                            <p className="product-article">Артикул: {product.арктикул}</p>
                            <p className="product-price">Цена: {product.цена} руб.</p>
   
                            <select className="product-select" onChange={(e) => setSelectedMaker(e.target.value)}>
                                <option value="" disabled selected>Производитель</option>
                                <option value="никон">Завод</option>
                                <option value="HOFER HF">HOFER HF</option>
                                <option value="завод">Никон</option>
                            </select>

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
                )})}
            </div>
        </div>
    );
}