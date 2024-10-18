import { useState } from 'react';
import './cardList.css';
import { Navigate } from 'react-router-dom';

export default function CardList() {
    const [redirect , setRedirect ] = useState(false)
    if (redirect){
        return <Navigate to='/armotisers' />
    }
    return (
        <div className="cardList-container">
            <div className="background-animation"></div>
            <div className="cardList">
                <div className="product-line">
                    <div className="product">
                        <h1>Стартеры</h1>
                        <img src="../../public/img/1.png" style={{maxWidth:"200px"}} alt="" />
                    </div>
                    <div className="product" onClick={()=>{
                        setRedirect(true)
                    }}>                        <h1>Амортизаторы</h1>
                    <img src="../../public/img/1.1.png" style={{maxWidth:"200px"}} alt="" /></div>
                </div>
                <div className="product-line">
                    <div className="product">                        <h1>Стеклоподьемники</h1>
                    <img src="../../public/img/2.png"style={{maxWidth:"160px"}} alt="" /></div>
                    <div className="product">                        <h1>Ступицы</h1>
                    <img src="../../public/img/3.png"   style={{maxWidth:"140px"}} alt="" /></div>
                </div>
                <div className="product-line">
                    <div className="product">                        <h1>Суппорта</h1>
                    <img src="../../public/img/4.png" style={{maxWidth:"200px"}} alt="" /></div>
                    <div className="product">                        <h1>Сцепления</h1>
                    <img src="../../public/img/5.png" style={{maxWidth:"200px"}} alt="" /></div>
                </div>
                <div className="product-line">
                    <div className="product">                        <h1>Термостаты</h1>
                    <img src="../../public/img/6.png" style={{maxWidth:"150px"}} alt="" /></div>
                    <div className="product">                        <h1>Реактивные тяги</h1>
                    <img src="../../public/img/7.png" style={{maxWidth:"160px"}} alt="" />
                    </div> 
                </div>
                <div className="product-line">
                    <div className="product">                        <h1>Насосы</h1>
                    <img src="../../public/img/8.png"style={{maxWidth:"400px"}} alt="" /></div>
                    <div className="product">                        <h1>Двигатели</h1>
                    <img src="../../public/img/9.png" style={{maxWidth:"180px"}} alt="" /></div>
                </div>
                <div className="product-line">
                    <div className="product">                        <h1> ГРМ</h1>
                    <img src="../../public/img/10.png" style={{maxWidth:"200px"}} alt="" /></div>
                    <div className="product">                        <h1>Маховики</h1>
                    <img src="../../public/img/11.png"style={{maxWidth:"200px"}} alt="" /></div>
                </div>
            </div>
        </div>
    );
}
