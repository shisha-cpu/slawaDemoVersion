// Modal.js
import React from 'react';
import './modal.css'; // Add styles for your modal here

const Modal = ({ isOpen, onClose, onDownload }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2> Благодарим за заказ ! <br /> <hr />
                В течении 10 минут с вами свяжется менеджер для подтверждения   </h2>
                <button onClick={onDownload}>Скачать смету заказа</button>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;
