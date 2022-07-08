import React, {useEffect, useState} from "react";
import Layout from "../core/Layout";
import Card from "../core/Card";
import { getProducts } from "../core/apiCore";
import ShowImage from "../core/ShowImage"; 
import moment from "moment";

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
                        setTopProduct([data[0],data[1], data[2]]);
                  }
            })
      }

      // every update time "Didmount" 
      useEffect(()=>{
            loadProductBySell();
      }, [])

      const showStock = quantity => {
            return quantity > 0 ? (
              <span className="badge badge-primary badge-pill">In Stock </span>
            ) : (
              <span className="badge badge-primary badge-pill">Out of Stock </span>
            );
          };
      return(

       <Layout title="Statistics" description="Best product and Best Category">
            <h2 className="mb-4 ml-4"> Top Category</h2>
            
                        <div className ="col-4 mb-3" >
                                
                              <li className="ml-4">Top Category: {topCategory.name}</li>
                
                        </div>
           
            <hr/>
            <h2 className="mb-4 ml-4"> Top Products</h2>
            <div className="row">
                  
                        
                              {topProduct.map((t, i)=>{
                                    return(
                                          <div className ="col-4 mb-3" >
                                                <div key={i}>
                                                      <li className="ml-4">Sold: {t.sold} times</li>
                                                      <ShowImage item={t} url="product" />
                                                      <p className="card-p  mt-2">{t.description} </p>
                                                      <p className="card-p black-10">$ {t.price}</p>
                                                      <p className="black-9">Category: {t.category && t.category.name}</p>
                                                      <p className="black-8">Added on {moment(t.createdAt).fromNow()}</p>
                                                      {showStock(t.quantity)}
                                                </div>
                                          </div>
                                    )
                              })}  
                             
            </div>            
                
                        
           
       </Layout>
            
)}

export default BestCategory;