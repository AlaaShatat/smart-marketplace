import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import Card from "../core/Card";
import { getProducts } from "../core/apiCore";
import ShowImage from "../core/ShowImage"; 

const BestCategory = ()=>{
      const [topCategory, setTopCategory] = useState([]);
      const [topProduct, setTopProduct] = useState([]);
      const [error, setError] = useState(false);

      const loadProductBySell = ()=>{
            getProducts('sold').then(data=>{
                  if(data.error){
                        setError(data.error)
                  }
                  else{
                        console.log(data);
                        setTopCategory(data[0].category);
                        setTopProduct(data[0]);
                  }
            })
      }

      // every update time "Didmount" 
      useEffect(()=>{
            loadProductBySell();
      }, [])

      return(

       <Layout title="Statistics" description="Best product and Best Category">
            <h2 className="mb-4"> Top Category</h2>
            <div className="row">
                        <div className ="col-4 mb-3" >
                                
                              <li>Top Category: {topCategory.name}</li>
                
                        </div>
            </div>
            <hr/>
            <h2 className="mb-4"> Top Product</h2>
            <div className="row">
                        <div className ="col-4 mb-3" >
                                
                              <li>Top Product has been sold: {topProduct.sold} times</li>
                              
                
                        </div>
            </div>
       </Layout>
            
)}

export default BestCategory;