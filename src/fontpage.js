import React, { useState } from 'react';
//import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import './styles.css';

import Camera from './camera';
import MapContainer from "./mapd";
import Picture from './picutre';

function Fontpage() {
  
  const [latLong, setLatlong] = useState([]);
  const [picture, setPicture] = useState();
  const [currentScreen, setCurrentScreen] = useState('HOME');

  
  const handleSetLatLong = (lat, long) =>{
    console.log(lat, long);
    setLatlong([lat, long]);
  }

  const handleSetPicture = (pic) =>{
    setPicture(pic);
  }

  const getLatLong  = ()=> latLong;
  const getCurrentPicutre = () => picture

  const setHomeScreen = () =>{
    setCurrentScreen('HOME');
  }
  const setUserScreen = () =>{
    setCurrentScreen('USER');
  }
  const setAdminScreen = () =>{
    setCurrentScreen('ADMIN');
  }

  let screenContent;

  if (currentScreen === 'HOME') {
    screenContent = <div></div>;
  } else if (currentScreen === 'USER') {
    screenContent = <Camera 
    onSavePicture = {handleSetPicture}
    onLatLongChange={handleSetLatLong}
    onBackClicked = {setHomeScreen}       
     />;
  } else if (currentScreen === 'ADMIN') {
    screenContent = 
    <div style={{display: 'flex',}}>
    <Picture
      getCurrentPicture = {getCurrentPicutre}
    />
    <MapContainer 
    latLongs={getLatLong} 
    />
    </div> ;
  }

  return (
    <Router>
    <div className="home-page">
      <header className="header">
        <h1>Garbage Collection Services</h1>
        <p>Your reliable partner in waste management.</p>
      </header>
     <nav className="nav">
          <NavLink onClick={setHomeScreen}>Home</NavLink>
          <NavLink onClick={setUserScreen}>User</NavLink>
          <NavLink onClick={setAdminScreen} >Admin</NavLink>
        </nav>

        {screenContent}

        
       

      <section className="contact">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out.</p>
        <a href="mailto:garbagecollection.com">garbagecollection.com</a>
      </section>
      <footer className="footer">
        <p>&copy; 2023 Garbage Collection Services. All rights reserved.</p>
      </footer>
      </div>
    </Router>
  );
}

export default Fontpage;