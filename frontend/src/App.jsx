import Header from "./Components/Header"
import Home from "./Components/Home"
import { Route , Routes} from "react-router-dom"
import Register from "./Components/Register"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import Armotisers from "./Components/Armotisers"
import Cell from "./Components/Cell"
import Basket from "./Components/Basket"
export default function App(){
  return(
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/armotisers" element={<Armotisers />} />
        <Route path="/cell" element={<Cell />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>

    </>    
  )
}