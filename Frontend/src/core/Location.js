import React, {useEffect, useState} from "react";
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import Layout from "./Layout";
import { map } from "../map";

const CurrentLocation = ()=>{
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyD-khK-E6Qc_hieAEKiLOBhcFhOBrUpERU"
    });
      // every update time "Didmount" 
      useEffect(()=>{
            navigator.geolocation.getCurrentPosition((position) =>{
                console.log(position.coords)
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
      }, [])
      const loading = (isLoaded)=>{
        
        if(!isLoaded) return <div> loading...</div>;
      }
      const center = (lat, long) =>{
            return {lat:lat, lng:long}
      }

      return(

       <Layout title="location" description="">
            <div className="clo-4">
                <li>latitude: {latitude}</li>
                <li>longitude: {longitude}</li>
                {isLoaded &&
                <GoogleMap
                        zoom={10}
                        center={center(latitude, longitude)}
                        mapContainerClassName = "col-8"
                >

                </GoogleMap>
                }
            </div>
            
       </Layout>
            
)}

export default CurrentLocation;