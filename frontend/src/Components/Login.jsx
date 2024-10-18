import { useEffect, useState } from "react"
import axios from 'axios'
import { fetchUser } from "../../store/slices/userSlice"
import { useDispatch } from "react-redux"
import { Navigate, Route } from "react-router-dom"
import './auth.css'
export default function Login(){
    const [name , setName ] = useState('')
    const [pass , setPass] = useState('')
    const [redirect , setRedirect] = useState(false)
    const dispatch = useDispatch()
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        const userData = {
            name , 
            pass
        }

        
        axios.post('http://localhost:4444/login' , userData)
        .then(res=>{
            dispatch(fetchUser(res.data))
            console.log(res.data);
            setRedirect(true)
        })
        .catch(err=>console.log(err)
        )
    }
    if (redirect) {
        return <Navigate to='/' />
    }
    return(
        <div className="auth-component">
            <form onSubmit={handleSubmit} className="form" >
            <h1>Вход </h1>
            <label >Имя : </label>
            <input type="text" onChange={(e)=>setName(e.target.value)} />

            <label >Пароль : </label>
            <input type="password" onChange={(e)=>setPass(e.target.value)} />

            <input type="submit" value="Войти" />
            </form>
        </div>
    )
}