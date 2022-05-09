import {useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
//import { useHistory } from "react-router-dom";
import './WebcamComponent.css';

const videoConstraints = {
  width: { min: 480 },
  height: { min: 678.72 },
  aspectRatio: 0.707,
  facingMode: "environment"
};


export default function WebcamComponent({ imgSrc, setImgSrc }) {
    const webcamRef = useRef(null);
    const navigate = useNavigate();


    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({width: 480, height: 678.72});
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    

    //let history = useHistory(); //need this for react router

    return (
        <div>
        <Webcam
            audio={false} 
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
            width={480}
            height={678.72}
        />
        <button 
            onClick={() => {
                capture();
                navigate('/preview')
                //console.log(imgSrc);
            }}
        >
            Capture photo
        </button>
        </div>
    );
};