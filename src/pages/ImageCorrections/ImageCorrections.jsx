import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoundingBox from "../../components/BoundingBox/BoundingBox";
import * as imageApi from "../../utilities/images-api";

export default function ImageCorrections() {
    const [correctedImg, setCorrectedImg] = useState(null);
    const { imageId } = useParams();
    

    
    useEffect(function() {
        async function getImage() {
            const image = await imageApi.getOne(imageId);
            setCorrectedImg(image)
        }
        getImage();
    }, [])
    console.log("Params in USE EFFECT!!!!!", imageId)

    return (
        <>
            <h2>Corrections</h2>
            {
            correctedImg
            ? (
                <div style={{ position: 'relative', display: 'inline-block', border: '2px dashed black' }}>
                    <img src={`data:image/png;base64,${correctedImg.imgSrc}`} alt="handwriting grammar corrections" />
                    {
                        correctedImg.textData.words.map((word, idx) => {
                            return(
                                <BoundingBox
                                    //values are calculated in percentages relative to original image size
                                    left={word.boundingBox.left - 5} 
                                    right={word.boundingBox.right}
                                    top={word.boundingBox.top}
                                    bottom={word.boundingBox.bottom}
                                
                                />
                                // <BoundingBox
                                //     //values are calculated in percentages relative to original image size
                                //     left={word.x1 - 15} 
                                //     right={correctedImg.textData.imgSize[0] - word.x3 - 5}
                                //     top={word.y1}
                                //     bottom={correctedImg.textData.imgSize[1] - word.y4}
                                //     width={correctedImg.textData.imgSize[0]}
                                //     height={correctedImg.textData.imgSize[1]}
                                // />
                            )
                        })
                    }
                </div>
            )
            : <h3>Loading</h3>
            }
        </>
    )
}