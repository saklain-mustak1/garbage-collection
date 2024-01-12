import React,{useRef, useEffect, useState} from "react";
import Latlon from "./Latlon"
import {saveAs} from 'file-saver';

function Camera(props) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {        
    navigator.mediaDevices.getUserMedia({video:{width:1920, height:1080}})
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error(err);
    })
  }

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    setHasPhoto(true);
  }
  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0,0,photo.width, photo.height);

    setHasPhoto(false);

  }

  const savePhoto = () => {
    if (hasPhoto) {
      let photo = photoRef.current;
      photo.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "taken_picture.png");
        }
      }, "image/png");
      const photoDataURL = photo.toDataURL("image/png");
      props.onSavePicture(photoDataURL);
    }
    closePhoto();
    props.onBackClicked();
  };

  const backHandler = ()=> {
    props.onBackClicked();
  }

  useEffect(() => {
    getVideo();
  },[videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>CLICK!</button>
        <button onClick={backHandler}>BACK!</button>
      </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto'
      :'')}>
        <canvas ref={photoRef}></canvas>
        <div className="bnt-container">
        <div className="btn-div">
          <button onClick={closePhoto}>CLOSE!</button>
          <button onClick={savePhoto}>UPLOAD</button>
        </div>
        
        </div>
      </div>
      <Latlon
        onLatLongChange = {props.onLatLongChange}
      />
    </div>
  );
}

export default Camera;