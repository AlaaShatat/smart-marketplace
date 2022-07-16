import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/userDashboard"
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Statistics from "./admin/Statistics";
import Stat1 from "./admin/Stat1";
import Stat2 from "./admin/Stat2";
import Stat3 from "./admin/Stat3";

import Profile from "./user/Profile";
import About from "./core/About";
import Addgovernorate from "./admin/AddGovernorate";
import AddAddress from "./admin/AddAddress";
import UpdateStore from "./admin/UpdateStore";
import Recommend from "./core/Recommend";
import currentLocation from "./core/Location";
import BestCategory from "./admin/BestCategory";

const Routes = () =>{
    return (<div>
        <BrowserRouter>
        <switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/shop" exact component = {Shop}/>
            <Route path="/signin" exact component ={Signin} />
            <Route path="/signup" exact component ={Signup} />
            <PrivateRoute path="/user/dashboard" exact component = {Dashboard} />
            <AdminRoute path="/admin/dashboard" exact component = {AdminDashboard} />
            <PrivateRoute path="/profile/:userId" exact component={Profile} />
            <AdminRoute path="/create/category" exact component={AddCategory} />
            <AdminRoute path="/create/product" exact component={AddProduct} />
            <Route path="/product/:productId" exact component={Product} />
            <Route path="/cart" exact component = {Cart}/>
            <Route path="/about" exact component = {About}/>
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <AdminRoute path="/admin/statistics" exact component={Statistics} />
            <AdminRoute path="/admin/statistics/rev" exact component={Stat1} />
            <AdminRoute path="/admin/statistics/orders" exact component={Stat2} />
            <AdminRoute path="/admin/statistics/prevMonth" exact component={Stat3} />


            <AdminRoute path="/admin/products" exact component={ManageProducts} />
            <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />   
            <AdminRoute path="/update/store" exact component={UpdateStore} />
            <AdminRoute path="/add/governorate" exact component={Addgovernorate} />
            <AdminRoute path="/add/address" exact component={AddAddress} />
            <PrivateRoute  path="/recommend/:userId" exact component={Recommend}/>
            <Route path="/current/location" exact component = {currentLocation}/>
            <Route path="/best/product" exact component={BestCategory} />
        </switch> 
        </BrowserRouter>
    </div>)
}
export default Routes;