import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from "./apiCore";
import Search from "./Search";

const Home = ()=>{
      const [productsBySell, setProductsBySell] = useState([])
      const [productsByArrival, setProductsByArrival] = useState([])
      const [error, setError] = useState(false)

      const loadProductBySell = ()=>{
            getProducts('sold').then(data=>{
                  if(data.error){
                        setError(data.error)
                  }
                  else{
                        setProductsBySell(data)
                  }
            })
      }

      // load by arrival 
      const loadProductByArrival = ()=>{
            getProducts('createdAt').then(data=>{
                  if(data.error){
                        setError(data.error)
                  }
                  else{
                        setProductsByArrival(data)
                  }
            })
      }
      // every update time "Didmount" 
      useEffect(()=>{
            loadProductByArrival()
            loadProductBySell()
      }, [])
      return(

       <Layout title="Home" description="ShopOn is a place to find your needs, find us in our branches.">
           <Search/>
            <h2 className="mb-4"> Best Sellers</h2>
            <div className="row">
                  {productsBySell.map((product,i) =>(
                        <div className ="col-4 mb-3" key={i}>
                              <Card  product = {product}/>
                        </div>
                  ))}
            </div>
            
            <hr/>
            <h2 className="mb-4"> New Arrivals</h2>
            <div className="row">      
                  {productsByArrival.map((product,i) =>(
                  <div className ="col-4 mb-3" key={i}>
                         <Card  product = {product}/>
                   </div>
                  ))}
            </div>
       </Layout>
            
)}

export default Home;