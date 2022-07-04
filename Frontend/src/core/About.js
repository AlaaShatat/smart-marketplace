import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import { getAddresses, getGovernorates } from "../admin/apiAdmin";
const About = ()=>{

      const [governorates, setGovernorates] = useState([]);
      const [addresses, setAddresses] = useState([]);
      const [error, setError] = useState(false)

      const loadGovernorates = ()=>{
        getGovernorates().then(data=>{
              if(data.error){
                    setError(data.error)
              }
              else{
                    setGovernorates(data)
              }
        })
    }
    const loadAddresses = () => {
        getAddresses().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setAddresses(data);
            }
        });
    };
    useEffect(() => {
        loadGovernorates();
        loadAddresses();
    }, []);
  
      return(

       <Layout title="ShopOn Store" description="ShopOn is a place where you can get everything you need!" className="container-fluid"> 
            <div className = "row" >
            <div className="col-2">
                    <h2>Our Branches</h2>
                    {governorates.map((g,i)=>{
                        return(
                            <div key={i}>
                                <h4>
                                    {g.name}
                                </h4>
                                {addresses.map((address, j)=>{
                                    <div key={j}>
                                        <p>{address.name}</p>
                                    </div>
                                }
                                )}
                                 
                            </div>

                        )
                    })
                  
                }

                </div>
                <div className="col-10">
                    <h3>About Us</h3>
                    <div className="mb-4">
                        <p> 
                            Online shopping in ShopOn is like a glass case, you can see through it and find everything you need. Our main role is to meet clients' needs, guarantee their quality, and do it at the most competitive costs.
                        </p>
                        <p> 
                            Customers can browse our online store to find what they need, and if they want, they can place an order via the website or visit one of the branches that carries it. Customers can also contact customer service to request support and help.
                        </p>
                    </div>

                </div>
            </div>
       </Layout>
            
)}

export default About;