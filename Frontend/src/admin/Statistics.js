import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";



const Statistics = () => {
    const [orders, setOrders] = useState([]);
    const { user, token } = isAuthenticated();
    
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        });
    };
    useEffect(() => {
        loadOrders();
    }, []);

  return (
    <Layout
    title="Statistics"
    description={`G'day ${
        user.name
    }, here are the shop statistics`}
    className="container-fluid"
>
    <div>Statistics</div>
    </Layout>
  )
}

export default Statistics