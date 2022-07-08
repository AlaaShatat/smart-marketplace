import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from "./apiCore";
import { getPurchaseHistory, catRecommend } from "../user/apiUser";
import { isAuthenticated } from "../auth"

const Recommend = ()=>{
      const [productsBySell, setProductsBySell] = useState([]);
      const [recommendedCategory, setRecommendedCategory] = useState([]);
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(true);
      

      const {
          user: { _id, name, email, role }
      } = isAuthenticated();
      const token = isAuthenticated().token;
  
      const init = (userId, token) => {
          catRecommend(userId, token).then(dataCat => {
            if (dataCat.error){
                setError(dataCat.error)
            }
            else{
                setLoading(false);
                console.log(dataCat);
                setRecommendedCategory(dataCat[0][0].category);
            }
          })
      };
      const loadProductBySell = ()=>{
            getProducts('sold').then(data=>{
                  if(data.error){
                        setError(data.error)
                  }
                  else{
                        setProductsBySell(data)
                  }
            })
      };
      // every update time "Didmount" 
      useEffect(()=>{
            init(_id, token);
            loadProductBySell();
            
      }, [])
      const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;
      const showError = error => error && <h2 className="text-danger">error...</h2>;
      return(

       <Layout title="Home" description="ShopOn is a place to find your needs, find us: Cairo, Saint Fatima.">
            <h2 className="mb-4">Top Categories for you</h2>
            <div className="row">
                {showLoading}
                {showError}
                  <li> Top category for you: {JSON.stringify(recommendedCategory.name)}</li>
               
            </div>
            <hr/>
            <h2 className="mb-4"> Best Sellers</h2>
            <div className="row">
                  {productsBySell.map((product,i) =>(
                        <div className ="col-4 mb-3" key={i}>
                              <Card  product = {product}/>
                        </div>
                  ))}
            </div>
       </Layout>
            
)}

export default Recommend;