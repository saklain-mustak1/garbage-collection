import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  // position:'relative',
  margin: '20px',
  width: '75%',
  height: '80%',
};
export class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    let ab=21.995687;
    let cd=82.063120;

    if (props.latLongs().length != 0) {
      ab = props.latLongs()[0][0];
      cd = props.latLongs()[0][1]
    }
    console.log(ab, cd);
    this.state = {
      cords: [
        {lat: ab, lng: cd},
        //{lat: 21.995687, lng: 82.063120}
      ]
    }
  }
  showMarkers = () => {
    return this.state.cords.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.lat,
       lng: store.lng
     }}
     onClick={() => console.log("Clicked")} />
    })
  }
  render() {
    return (
      
      <div className='mapbox'>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ 
            lat: 22.134, 
            lng: 82.143
        }}>
          {this.showMarkers()}
        </Map></div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBcyujVZMfbNvDt-Dv2rZaF61Ba1xW5YQM'
})(MapContainer);