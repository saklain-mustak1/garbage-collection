import React, { useEffect, useState} from "react";

function Latlon(props){
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();

    const setNewLatLong = (lat, long) =>{
      props.onLatLongChange([lat, long]);
    }
    useEffect(() =>{
      navigator.geolocation.getCurrentPosition((position)=>{
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
        setNewLatLong(position.coords.latitude, position.coords.longitude)
      })
    }, [])
	return(
		<div>
			<h1>latitude:{lat} and longitude: {lon}</h1>
		</div>
	);
}

export default Latlon;