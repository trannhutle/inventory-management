import React from "react"
import Header from "./Header"
import Order from "./Order"
import Inventory from "./Inventory"
class App extends React.Component{
    render(){
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Catch of the day" age={100}/>
                </div>
                <Inventory/>
                <Order/>
            </div>
        )
    }
}

export default App;