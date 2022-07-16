import React, { useState, useEffect , Component  } from "react";
 import { format, formatDistance, formatRelative, subDays }  from 'date-fns';
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";
import CanvasJSReact from './canvasjs.react';
import { ContactSupportOutlined } from "@material-ui/icons";
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


const Stat3 = () => {
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
let lastMonth =moment().subtract(0, "month").startOf("month").format('MM');
//console.log(lastMonth);

    let newOrders =orders.filter((order) => moment(order.updatedAt).format('MM')==lastMonth) ;
       
    const getDaysOfMonth = function(year, month) {
        let monthDate = moment(year+'-'+month, 'YYYY-MM');
        let daysInMonth = monthDate.daysInMonth();
        let arrDays = [];
        let i = 1;
        while(daysInMonth) { 
            
          var current = moment([year,month-1]).date(i);
          arrDays.push(current.format('LL'));
          daysInMonth--;
          i++;
        }

        return arrDays;
  };

  let curYear=moment().format('YYYY');
  if(lastMonth==12)
    curYear=curYear-1;

  let dateList = getDaysOfMonth(curYear, lastMonth);
  //console.log(dateList);

    let col=Array(31).fill(0);

    let loadColumns=newOrders.map(res=>{
  
       let  index = dateList.findIndex(x => x==moment(res.updatedAt).format('LL'));
        col[index-1]+=res.amount;
       });
     
  
    let data1=[]
    data1=dateList.map( (res,index) =>{  return( { x: new Date (moment(dateList[index])), y: col[index] });  }) ;
    //console.log(data1);
    //console.log(col)


    const Chart2 = () => {

                const options = {
                    animationEnabled: true,
                    title:{
                        text: "Last Month Sales"
                    },
                    axisX: {
                        //valueFormatString: "LL"
                    },
                    axisY: {
                        title: "Sales (in USD)",
                        prefix: "$"
                    },
                    scales:{
                        x:{
                            type:'time',
                        time:{unit:'day'}},
                        y:{beginAtZero:'default'}
                     }
                     ,
                    data: [{
                        yValueFormatString: "$#,###",
                        //xValueFormatString: "",
                        type: "spline",
                        dataPoints:data1
                 
                        
                    }]
                }
                
                return (
                <div>
                    <CanvasJSChart options = {options}
                        /* onRef={ref => this.chart = ref} */
                    />
        
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

export default Stat3



   