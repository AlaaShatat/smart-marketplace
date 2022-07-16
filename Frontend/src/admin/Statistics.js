import React, { useState, useEffect , Component  } from "react";
 import { format, formatDistance, formatRelative, subDays }  from 'date-fns';
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from '../auth';

const Statistics =()=>{
    const { user, token } = isAuthenticated();
    
    const Stats = () => {
        return (
            <div className="card">
                <h4 className="card-header">Stats</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/statistics/rev">
                           Revenue of Current Week
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/statistics/orders">
                           Orders of Current Week
                        </Link>
                    </li>
                    <li className="list-group-item">
                    <Link className="nav-link" to="/admin/statistics/prevMonth">
                        Last Month Revenue 
                    </Link>
                </li>
               
                </ul>
            </div>
        )}
    
  return (
    <Layout
    title="Statistics"
    description={`G'day ${
        user.name
    }, here are the shop statistics`}
    className="container-fluid"
    >   
        <div className="row">
            <div className="col-3">
                {Stats()}
            </div>

        </div>



    </Layout>
  )
}

export default Statistics