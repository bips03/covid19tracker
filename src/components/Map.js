import React from 'react'
import { MapContainer, TileLayer, useMap} from "react-leaflet"
import "./Map.css"
import {showDataOnMap} from "../util.js"

function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map({center,zoom,countries,casesType}) {
    return (
        <div className = "map">
            
            <MapContainer>
            <ChangeMap center = {center}
            zoom = {zoom} />
                <TileLayer
                  
                   url = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png" 
                   attribution = '&copy; <a href = "https://carto.com/" >carto.com</a> contibutors'
                />


            {showDataOnMap(countries,casesType)}
                
            </MapContainer>

        </div>
    )
}

export default Map
