import {useState, useEffect} from 'react'

function Picture(props) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() =>{
        setPhotoUrl(props.getCurrentPicture())
      }, [])
	return(
		<div>
		<h1 style={{backgroundColor:'red'}}>this is garbage Picture</h1>
			{photoUrl && <img src={photoUrl} alt="Captured" />}
		</div>
	);
}
export default Picture;