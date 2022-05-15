import {useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import FlipCameraIosRoundedIcon from '@mui/icons-material/FlipCameraIosRounded';
import './WebcamComponent.css';



export default function WebcamComponent({ imgSrc, setImgSrc }) {
    const [facingEnvironment, setFacingEvironment] = useState(true)
    const webcamRef = useRef(null);
    const navigate = useNavigate();
    
    const width = window.innerWidth > 480 ? 480 : window.innerWidth
    
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: width, height: width*1.414});
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
    
    //let history = useHistory(); //need this for react router
    const videoConstraints = {
      aspectRatio: 0.707,
      facingMode: facingEnvironment ? 'environment' : 'user'
    };

    return (
        <div className='WebcamComponent flex-ctr-ctr flex-col'>
            <Webcam
                audio={false} 
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                width={width}
                height={width*1.414}
            />
            <div className='camera-tools'>
                <CollectionsRoundedIcon
                    onClick={()=> navigate('/')}
                    sx={{background: 'white', fontSize: 35, cursor: 'pointer'}}
                />
                <div className="camera-button" onClick={() => {
                    capture();
                    navigate('/preview')
                }}></div>
                <FlipCameraIosRoundedIcon 
                    onClick={() => setFacingEvironment(!facingEnvironment)}
                    sx={{background: 'white', fontSize: 35, cursor: 'pointer'}}
                />
            </div>
        </div>
    );
};