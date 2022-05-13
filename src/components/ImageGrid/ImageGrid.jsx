import { useState, useEffect } from "react";
import * as imagesApi from '../../utilities/images-api';
import ImageCard from "../ImageCard/ImageCard";
import './ImageGrid.css'

export default function ImageGrid() {
    const [imgIndex, setImgIndex] = useState([]);


    useEffect(function() {
        async function getImages() {
            const images = await imagesApi.getAll();
            console.log("\n\nImages!\n",images);
            setImgIndex(images)
        }
        getImages();
    }, [])

    return (
        <div className="ImageGrid">
            {imgIndex.map(img => <ImageCard img={img} />)}
        </div>
    )
}