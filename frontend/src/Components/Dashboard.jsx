import { useSelector } from "react-redux";
import './dashboard.css';
import { Bar, Line, Pie } from 'react-chartjs-2';  // Использую графики из 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// Регистрация элементов ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

export default function Dashboard() {
    const user = useSelector(state => state.user[0]);

    const randomOrders = [
        {
            id: 1,
            product: "Стартер",
            status: "Доставлен",
            steps: ["Заказ принят", "Собираем заказ", "Находим курьера", "В пути", "Доставлено"],
            currentStep: 4,
            productDetails: {
                "фото": "https://avatars.mds.yandex.net/i?id=1934132820217975875eef1f4244b769c50a155fbf93e561-12323207-images-thumbs&n=13",
                "наименование": "Стартер ВАЗ 2108, 2115 (1.55 кВт редуктор.) HOFER",
                "артикул": 1085185,
                "цена": 2300
            }
        },
        {
            id: 2,
            product: "Стеклоподьемник",
            status: "В пути",
            steps: ["Заказ принят", "Собираем заказ", "Находим курьера", "В пути", "Доставлено"],
            currentStep: 3,
            productDetails: {
                "фото": "https://rusautoopt.ru/assets/images/products/40615/bigwp/2891.webp",
                "наименование": "Стеклоподьемник-ВАЗ 2101 перед в индив. Упак. (ЯВА) 2101-6104020",
                "артикул": 1025164,
                "цена": 760
            }
        },
        {
            id: 3,
            product: "суппорт",
            status: "Обработан",
            steps: ["Заказ принят", "Собираем заказ", "Находим курьера", "В пути", "Доставлено"],
            currentStep: 2,
            productDetails: {
                "фото": "https://rusautoopt.ru/assets/images/products/35850/bigwp/08609.webp",
                "наименование": "суппорт ваз 2101-07 правый с колодками завод",
                "артикул": 8484884,
                "цена": 1100
            }
        },
    ];

    const chartData = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
        datasets: [
            {
                label: 'Продажи (₽)',
                data: [120000, 190000, 300000, 500000, 250000, 350000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Стартер', 'Стартеры', 'Стеклоподьемники', 'Ступницы', 'Суппорта', 'Стартеры', 'Сцепления', 'Термостаты', 'Насосы' , 'Амортизаторы' ],
        datasets: [
            {
                label: 'Товары',
                data: [55, 25, 20,55, 25, 32 , 55, 45, 30 , 12],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',    
                    'rgba(255, 99, 132, 0.6)',    
                    'rgba(54, 162, 235, 0.6)',    
                    'rgba(255, 206, 86, 0.6)',    
                    'rgba(153, 102, 255, 0.6)',  
                    'rgba(255, 159, 64, 0.6)'     
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
            },
        ],
    };
    console.log(user);
    
    return (
        <section className="dashboard-section">
            {user.name !== 'admin' ? (
                <div className="dashboard">
                    <h1 className="dashboard-title">
                        Личный кабинет пользователя: {user.name}
                    </h1>
                    <div className="dashboard-user-data">
                        <h3>Личные данные пользователя:</h3>
                        <ul className="dashboard-userList">
                            <li><strong>Имя:</strong> {user.name}</li>
                            <li><strong>Email:</strong> {user.email}</li>
                            <li><strong>Телефон:</strong> {user.phone}</li>
                            <li><strong>Адрес:</strong> {user.address}</li>
                            <li><strong>Автомобиль:</strong> {user.auto}</li>
                        </ul>

                        <h3 >История заказов :</h3>
                        <div className="order-history">
                            {randomOrders.map(order => (
                                <div key={order.id} className="order-item">
                                    <div className="product-details">
                                        <img src={order.productDetails.фото} alt={order.productDetails.наименование} />
                                        <div>
                                            <h4>{order.productDetails.наименование}</h4>
                                            <p>Артикул: {order.productDetails.артикул}</p>
                                            <p>Цена: {order.productDetails.цена} ₽</p>
                                            <p><strong>Статус:</strong> {order.status}</p>
                                        </div>
                                    </div>
                                    <div className="delivery-progress">
                                        <div className="progress-line">
                                            <div className="progress-fill" style={{ width: `${(order.currentStep + 1) / order.steps.length * 100}%` }}></div>
                                        </div>
                                        <div className="steps-list">
                                            {order.steps.map((step, index) => (
                                                <div key={index} className={`step-item ${index <= order.currentStep ? "step-active" : ""}`}>
                                                    <div className="step-marker"></div>
                                                    <span>{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="dashboard">
                    <h1 className="dashboard-title">
                        Панель администратора
                    </h1>
                    <h3 className="dashboard-title">Последние заказы:</h3>
                    <div className="order-history">
                        {randomOrders.map(order => (
                            <div key={order.id} className="order-item">
                                <div className="product-details">
                                    <img src={order.productDetails.фото} alt={order.productDetails.наименование} />
                                    <div>
                                        <h4>{order.productDetails.наименование}</h4>
                                        <p>Артикул: {order.productDetails.артикул}</p>
                                        <p>Цена: {order.productDetails.цена} ₽</p>
                                        <p><strong>Статус:</strong> {order.status}</p>
                                    </div>
                                </div>
                                <div className="delivery-progress">
                                    <div className="progress-line">
                                        <div className="progress-fill" style={{ width: `${(order.currentStep + 1) / order.steps.length * 100}%` }}></div>
                                    </div>
                                    <div className="steps-list">
                                        {order.steps.map((step, index) => (
                                            <div key={index} className={`step-item ${index <= order.currentStep ? "step-active" : ""}`}>
                                                <div className="step-marker"></div>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

      
                        <div className="chart">
                        <div className="chart-container">
                    <h3>Статистика продаж:</h3>
                        <Bar data={chartData} />
                    </div>

     
                    <div className="chart-container1 chart-container">
                    <h3>Популярные товары:</h3>
                        <Pie data={pieData} />
                    </div>
                        </div>
                </div>
            )}
        </section>
    );
}
