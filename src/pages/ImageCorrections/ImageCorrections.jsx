import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as imageApi from "../../utilities/images-api";

export default function ImageCorrections() {
    const { imageId } = useParams();
    const [correctedImg, setCorrectedImg] = useState(null);

    useEffect(function() {
        async function getImage() {
            const image = await imageApi.getOne(imageId);
            setCorrectedImg(image)
        }
    }, [])
    return (
        <>
            <h2>Corrections</h2>
            <img src={`data:image/png;base64,${correctedImg.imgSrc}`} alt="handwriting grammar corrections" />
        </>
    )
}