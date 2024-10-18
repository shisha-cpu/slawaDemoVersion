import CardList from "./CardList"
import Products from "./Products"
export default function Home(){
    return(
      <div className="home">
                <CardList />
                <Products />  
      </div>
    )
  }