import { useEffect, useState } from "react"; 
import axios from 'axios';
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/slices/userSlice";
import { Navigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [auto, setAuto] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            phone,
            password: pass,
            auto,
            address 
        };
        axios.post('http://localhost:4444/register', userData)
            .then(res => {
                console.log(res.data);
                setRedirect(true);
                dispatch(fetchUser(res.data)); // Здесь уже данные в нужном формате
            })
            .catch(err => console.log(err));
    };

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <div className="auth-component">
            <form onSubmit={handleSubmit}>
                <h1 className="auth-title">Регистрация</h1>
                <label>Имя:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
                <label>Email:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <label>Телефон:</label>
                <input type="phone" onChange={(e) => setPhone(e.target.value)} />
                <label>Пароль:</label>
                <input type="password" onChange={(e) => setPass(e.target.value)} />
                
                <label className="optional">Автомобиль (необязательно):</label>
                <input className="optional" type="text" onChange={(e) => setAuto(e.target.value)} />
                
                <label className="optional">Адрес (необязательно):</label>
                <input className="optional" type="text" onChange={(e) => setAddress(e.target.value)} />
                
                <input type="submit" value="Зарегистрироваться" />
            </form>
        </div>
    );
}
