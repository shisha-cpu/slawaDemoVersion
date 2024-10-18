import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user.js'
mongoose 
.connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/slavaLOXm?retryWrites=true&w=majority&appName=Cluster0' ) 
 .then(()=> console.log('DB okey')) 
 .catch((err)=> console.log('db error' , err))


const app = express()


app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    const { name, email, password, phone, auto, address } = req.body;
    const newUser = new User({
        name,
        email,
        password,
        phone,
        auto,
        address,
    });

    await newUser.save();
    

    res.send([{ _id: newUser._id, name: newUser.name, phone: newUser.phone, email: newUser.email, auto: newUser.auto  , address : newUser.address}]);
});

app.post('/login',async(req , res)=>{
    const {name , pass} = req.body
    const user = await User.find({name})
    if (!user) {
        return req.status(404).json({message : 'Пользователь не найден'})
    }
    res.send(user)
})
app.post('/addBasket/:id', async (req, res) => {
    const { id } = req.params;
    const { item, qty } = req.body; 
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const existingItem = user.basket.find(basketItem => basketItem.арктикул === item.арктикул);
        if (existingItem) {
            existingItem.quantity += qty; // Update quantity if item exists
        } else {
            user.basket.push({ ...item, quantity: qty }); // Add new item
        }
        
        await user.save(); // Don't forget to save the user
        res.json(user.basket); // Return updated basket
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при добавлении в корзину' });
    }
});


app.get('/userBasket/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        res.status(200).send(user.basket);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка получения корзины' });
    }
});

// Добавить удаление товара из корзины
app.delete('/userBasket/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }
        user.basket = []; // Очищаем корзину
        await user.save();
        res.status(200).json({ message: 'Корзина очищена' });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка очистки корзины' });
    }
});


app.listen(4444, ()=>{
    console.log('Сервер запущен');
})

