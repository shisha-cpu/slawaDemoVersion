import { useEffect, useState } from 'react';
import './cell.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Cell() {
    const [img, setImg] = useState('https://avatars.mds.yandex.net/get-goods_pic/9237130/hat7976556fa23bc6b2233be85a3ef610e8/500x500');
    const [price, setPrice] = useState(500);
    const [maker, setMaker] = useState('никон');
    const user = useSelector(state => state.user[0]);
    const [quantity, setQuantity] = useState({});
    const [totalPrice, setTotalPrice] = useState(price); 

    const handleQuantityChange = (event, article) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            const qty = value ? parseInt(value) : 1; // Default to 1 if empty
            setQuantity(prev => ({
                ...prev,
                [article]: qty
            }));
            setTotalPrice(qty * price); // Update total price based on quantity
        }
    };

    useEffect(() => {
        if (maker === 'никон') {
            setImg('https://avatars.mds.yandex.net/get-goods_pic/9237130/hat7976556fa23bc6b2233be85a3ef610e8/500x500');
            setPrice(500);
        }
        if (maker === 'HOFER HF') {
            setImg('https://b2motor.ru/upload/iblock/a8d/a8d21beb982e705561a01672aea8ab4d.jpg');
            setPrice(450);
        }
        if (maker === 'завод') {
            setImg('https://cdn1.ozone.ru/s3/multimedia-f/6487353795.jpg');
            setPrice(800);
        }
        // Update total price whenever price or quantity changes
        const qty = quantity[26262] || 1;
        setTotalPrice(qty * price);
    }, [maker, quantity, price]);

    const handleClick = (item) => {
        const qty = quantity[item.арктикул] || 1; 
        alert(`Товар "${item.наименование}" успешно добавлен в корзину, количество: ${qty}`);
        axios.post(`http://localhost:4444/addBasket/${user._id}`, { item, qty })
            .then(res => {
                console.log(res.data);
                dispatch(updateBasket(res.data));
            })
            .catch(err => console.log(err));
    };

    const productInfo = [
        { label: 'Тип', value: 'Амортизатор подвески' },
        { label: 'Партномер (артикул производителя)', value: '2101-2905002-70/2905003-70' },
        { label: 'Количество в упаковке, шт', value: '2' },
        { label: 'Место установки', value: 'Передние' },
    ];

    return (
        <div className="cell">
            <h2 className="cell-title">Амортизатор передн. 2101 Никон</h2>
            <div className="cell-container">
                <div className="cell-photo">
                    <img src={img} alt="Product" />
                </div>
                <div className="cell-content">
                    <p className='cell-price'>Цена: {totalPrice}₽</p> {/* Use totalPrice instead of price */}
                    <p className='cell-text'>
                        Амортизатор передн. 2101 
                    </p>
                    <div className="select-buttons">
                        <button onClick={() => setMaker('никон')} className="select-btn">Никон</button>
                        <button onClick={() => setMaker('HOFER HF')} className="select-btn">HOFER HF</button>
                        <button onClick={() => setMaker('завод')} className="select-btn">Завод</button>
                    </div>

                    <div className="product-details">
                        <table className="details-table">
                            <tbody>
                                {productInfo.map((item, index) => (
                                    <tr key={index}>
                                        <td className="table-label">{item.label}</td>
                                        <td className="table-value">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {user ? (
                        <>
                            <div className="quantity-container quantity-container1">
                                <button 
                                    className="quantity-button" 
                                    onClick={() => setQuantity(prev => {
                                        const newQty = Math.max((prev[26262] || 1) - 1, 1);
                                        setTotalPrice(newQty * price); // Update total price when quantity changes
                                        return { ...prev, [26262]: newQty };
                                    })}>
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    className="quantity-input" 
                                    value={quantity[26262] || 1} 
                                    onChange={(e) => handleQuantityChange(e, 26262)} 
                                    min="1" 
                                />
                                <button 
                                    className="quantity-button" 
                                    onClick={() => setQuantity(prev => {
                                        const newQty = (prev[26262] || 1) + 1;
                                        setTotalPrice(newQty * price); // Update total price when quantity changes
                                        return { ...prev, [26262]: newQty };
                                    })}>
                                    +
                                </button>
                                <button 
                                    onClick={() => handleClick({
                                        фото: img,
                                        арктикул: 26262,
                                        наименование: 'Амортизатор передн. 2101',
                                        цена: totalPrice // Send totalPrice instead of price
                                    })} 
                                    className="product-btn product-btn1"
                                >
                                    Купить
                                </button>
                            </div>
                        </>
                    ) : ''}
                </div>
            </div>
        </div>
    );
}
