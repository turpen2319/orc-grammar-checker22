import { useState, useEffect } from "react";
import * as imagesApi from '../../utilities/images-api';
import ImageCard from "../ImageCard/ImageCard";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './ImageGrid.css';

export default function ImageGrid() {
    const [imgIndex, setImgIndex] = useState([]);
    const [loadingIndex, setLoadingIndex] = useState(true);
    const navigate = useNavigate()

    useEffect(function() {
        async function getImages() {
            const images = await imagesApi.getAll();
            console.log("\n\nImages!\n",images);
            setLoadingIndex(false)
            setImgIndex(images)
        }
        getImages();
    }, [])

    return (
        <div className="ImageGrid">
            {loadingIndex
            ? 
                <>{[...Array(20)].map((e, i) => <Skeleton  animation='wave' variant='rectangle' width={150} height={200} sx={{margin: '10px'}}/>)}</>
            : 
                <>
                    <div className="new-card ImageCard flex-ctr-ctr flex-col" onClick={() => navigate('/webcam') }>
                        <AddAPhotoRoundedIcon sx={{fontSize: 40, color: 'var(--blue)'}}/>
                        <h2>New</h2>
                    </div>
                    {imgIndex.map((img, idx) => <ImageCard key={idx} img={img} />)}
                </>
            }  
        </div>
    )
}