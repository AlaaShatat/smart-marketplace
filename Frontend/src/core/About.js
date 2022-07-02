import React, {useEffect, useState} from "react";
import Layout from "./Layout";

const About = ()=>{
      
      return(

       <Layout title="ShopOn Store" description="ShopOn is a place where you can get everything you need!" className="container-fluid"> 
            <div className = "row" >
            <div className="col-2">
                    <h3>Our Branches</h3>
                    <ul>
                        <h4>Cairo</h4>
                        <li>Saint Fatima</li>
                        <li>Roxi</li>
                        <li>Nasr City</li>

                    </ul>

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