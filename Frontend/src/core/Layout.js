import React from "react";
import Menu from "./Menu";
import "../styles.css";
import Home from "./Home";

const address = ()=> {
    return(
        <div>
            <hr/>
        <p>
        find us: Cairo, Saint Fatima.
        </p>
        </div>
        
)}
const Layout = ({title = "Title", description = "Description", className, children}) =>{
    
    return(
        
        <div>
            <Menu/>
            <div className="jumbotron">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default Layout;