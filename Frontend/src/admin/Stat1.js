import React, { useState, useEffect , Component  } from "react";
 import { format, formatDistance, formatRelative, subDays }  from 'date-fns';
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
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




const Stat1 = () => {
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

let newOrders =orders.filter((order) => parseInt(((moment().startOf('day')-moment(order.updatedAt).startOf('day')))/(60*60*24*1000))<=6);// order.updatedAt!== id);
//setOrders(newA);


    let col=[0,0,0,0,0,0,0];
    let row=[moment().subtract(6, 'days').format('LL'),
    moment().subtract(5, 'days').format('LL'),
    moment().subtract(4, 'days').format('LL'),
    moment().subtract(3, 'days').format('LL'),
    moment().subtract(2, 'days').format('LL'),
    moment().subtract(1, 'days').format('LL'),
    moment().subtract(0, 'days').format('LL')
    ];

    let loadColumns=newOrders.map(res=>{
  
       let  index = row.findIndex(x => x==moment(res.updatedAt).format('LL'));
    //    console.log(index);
        col[index]+=res.amount;
       });
    
    //   console.log("rowww",row)
    //   console.log("colmns",col)


    const Chart2 = () => {

        const options = {
            title: {
                text: "Weekly Sales"
            },
            axisY: {
                title: "Sales (in USD)",
                prefix: "$"
            },
    
            data: [
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: [
                    {x:moment(row[0]),  y: col[0]  },
                    {x:moment(row[1]), y: col[1]  },
                    { x:moment(row[2]), y: col[2] },
                    {x:moment(row[3]),  y: col[3]},
                    { x:moment(row[4]),  y: col[4] },
                    { x:moment(row[5]),  y: col[5] },
                    {x: new Date(moment(row[6])),  y: col[6]  },
    
                ]
                ,
                backgroundColor: [
                    'rgba(255, 26, 104, 0.2)',
                     'rgba(54, 162, 235, 0.2)',
                     'rgba(255, 206, 86, 0.2)',
                     'rgba ( 75, 192, 192, 0.2)',
                    'rgba( 153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 26, 104, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba ( 75, 192, 192, 1)',
                    'rgba( 153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 0, 0, 1)']
            }
    
    
    
            ]
            ,
             scales:{
                x:{
                    type:'time',
                time:{unit:'day'}},
                y:{beginAtZero:'default'}
             }
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
            );
        }



return (


<Layout
title="Statistics"
description={`G'day ${
    user.name
}, here are the shop statistics`}
className="container-fluid"
>
<div className="row">
            <div className="col-3">{Stats()}</div>
{/* </div>
<div className="row"> */}

            <div className="col-md-8">
{/* <div className="row"> */}

{/* <div style={ { marginLeft:'30px'}}> */}


<Chart2/>
</div>
</div>



</Layout>
)
}

export default Stat1