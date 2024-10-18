import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchBasketProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4444/userBasket/${user._id}`);
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
    
        console.log(products);
        
    const handleQuantityChange = (index, change) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map((product, i) => {
                if (i === index) { 
                    const newQuantity = Math.max(product.quantity + change, 1);
                    return { ...product, quantity: newQuantity };
                }
                return product; 
            });
            calculateTotal(updatedProducts); // Пересчитываем общую сумму
            return updatedProducts;
        });
    };
    

    useEffect(() => {
        calculateTotal(products);
    }, [products]);

    const handleOrder = async () => {
        try {
            await axios.delete(`http://localhost:4444/userBasket/${user._id}`);
            setProducts([]); 
            setTotalPrice(0); 
            setIsModalOpen(true);
            await sendOrderToTelegram(); 
        } catch (error) {
            console.error("Ошибка удаления корзины:", error);
        }
    };

    const sendOrderToTelegram = async () => {
        const date = new Date().toLocaleDateString();
        const address = "Введите адрес для получения"; 
        const orderDetails = products.map(product => 
            `${product.наименование} - ${product.quantity} шт. по ${product.цена} руб.`
        ).join('\n');
        
        const message = `
            Добрый день,
            Дата получения: ${date}
            Адрес для получения: ${address}
            Общая сумма: ${totalPrice} руб.
        `.trim(); 
        
        try {
            // Send the message first
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown', 
            });
            
            console.log("Order message sent to Telegram");
            
            // Prepare to send the document
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            
            // Fetch the PDF file as a Blob
            const response = await fetch('./order.pdf');
            const blob = await response.blob();
            formData.append('document', blob, 'order.pdf'); // attach the Blob
    
            // Send the document
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // This can be used for browser-based environments
                },
            });
            
            console.log("Order file sent to Telegram");
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
