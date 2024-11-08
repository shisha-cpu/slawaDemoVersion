import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './basket.css';
import Modal from './Modal';
import { updatePrice } from "../../store/slices/priceSlice";

const TELEGRAM_BOT_TOKEN = '7567450625:AAFwj7FxN2nhhclWjne4YMO4LeRAcA_58yw';
const CHAT_ID = '1137493485';

export default function Basket() {
    const user = useSelector((state) => state.user[0]);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState(new Date());
    const [deliveryTime, setDeliveryTime] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchBasketProducts = async () => {
            try {
                const response = await axios.get(`http://89.169.39.144:4444/userBasket/${user._id}`);
                setProducts(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error("Error fetching basket products:", error);
            }
        };

        fetchBasketProducts();
    }, [user._id]);

    const calculateTotal = (products) => {
        if (!products || products.length === 0) {
            setTotalPrice(0);
            return;
        }
        const total = products.reduce((acc, product) => acc + (product.цена * product.quantity || 0), 0);
        dispatch(updatePrice(total));
        setTotalPrice(total);
    };

    const handleQuantityChange = (index, change) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map((product, i) => {
                if (i === index) {
                    const newQuantity = Math.max(product.quantity + change, 1);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
            calculateTotal(updatedProducts);
            return updatedProducts;
        });
    };

    const handleOrder = async () => {
        try {
            await axios.delete(`http://89.169.39.144:4444/userBasket/${user._id}`);
            setProducts([]);
            setTotalPrice(0);
            setIsModalOpen(true);
            await sendOrderToTelegram();
        } catch (error) {
            console.error("Ошибка удаления корзины:", error);
        }
    };

    const sendOrderToTelegram = async () => {
        const orderDetails = products.map(product =>
            `${product.наименование} - ${product.quantity} шт. по ${product.цена} руб.`
        ).join('\n');

        const message = `
            Добрый день,
            Дата получения: ${deliveryDate.toLocaleDateString()}
            Время получения: ${deliveryTime}
            Адрес для получения: ${deliveryAddress}
            Общая сумма: ${totalPrice} руб.
            Товары:
            ${orderDetails}
        `.trim();

        try {
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            });
            console.log("Order message sent to Telegram");
        } catch (error) {
            console.error("Error sending message to Telegram:", error);
        }
    };

    const handleDownloadEstimate = () => {
        const link = document.createElement('a');
        link.href = './order.pdf';
        link.download = 'order.pdf';
        link.click();
    };

    return (
        <section className="dashboard-section">
            <div className="dashboard">
                <h1 className="dashboard-title">Корзина</h1>
                <div className="dashboard-user-data">
                    {products.map((product, index) => (
                        <div key={index} className="product-details1">
                            <img src={product.фото} alt={product.наименование} />
                            <h2 className="product-name"><strong>{product.наименование}</strong></h2>
                            <p className="product-article">Артикул: {product.арктикул}</p>
                            <p className="product-price">Цена: {product.цена} руб.</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="total-price">Сумма заказа: {totalPrice} руб.</h2>

                {/* Delivery details */}
                <div className="delivery-details">
                    <label>Выберите дату доставки:</label>
                    <DatePicker
                        selected={deliveryDate}
                        onChange={(date) => setDeliveryDate(date)}
                        dateFormat="dd/MM/yyyy"
                    />

                    <label>Введите время доставки:</label>
                    <input
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                    />

                    <label>Введите адрес доставки:</label>
                    <input
                        type="text"
                        placeholder="Адрес доставки"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                </div>

                <button className="order-button" onClick={handleOrder}>Заказать</button>

                {/* Modal component */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onDownload={handleDownloadEstimate}
                />
            </div>
        </section>
    );
}
