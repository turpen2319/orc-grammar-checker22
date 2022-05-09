import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as imagesApi from '../../utilities/images-api';
import ImageCard from "../../components/ImageCard/ImageCard";

export default function ImageIndex() {
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
        <>
            <h1>Index page</h1>
            {imgIndex.map(img => <ImageCard img={img} />)}
        </>
    )
}