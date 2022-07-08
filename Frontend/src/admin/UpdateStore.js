import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const updateStore =()=>{
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/add/governorate">
                            Add Governorate
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/add/address">
                            Add Address
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/manage/about">
                            Manage About
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };
    return  (
        <Layout
            title="Store Info"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
            </div>
        </Layout>
    );
};
export default updateStore;