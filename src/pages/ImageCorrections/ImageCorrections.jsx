import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoundingBox from "../../components/BoundingBox/BoundingBox";
import CorrectionMessage from "../../components/CorrectionMessage/CorrectionMessage";
import SpeedDialMenu from "../../components/SpeedDial/SpeedDial";
import useMediaQuery from '@mui/material/useMediaQuery';
import * as imageApi from "../../utilities/images-api";
import './ImageCorrections.css';

export default function ImageCorrections({ setUser }) {
    const [correctedImg, setCorrectedImg] = useState(null);
    const { imageId } = useParams();
    const isMobile = useMediaQuery('(max-width:480px)');

    
    useEffect(function() {
        async function getImage() {
            const image = await imageApi.getOne(imageId);
            setCorrectedImg(image)
        }
        getImage();
    }, [])
    console.log("Params in USE EFFECT!!!!!", imageId)

    return (
        <main className="ImageCorrections">
            <SpeedDialMenu setUser={setUser} />
            {
            correctedImg
            ? (
                <>
                    <div className="corrections-container"> 
                        <img src={`data:image/png;base64,${correctedImg.imgSrc}`} alt="handwriting grammar corrections" />
                        {
                            correctedImg.textData.corrections.map((correction, idx) => {
                                return(
                                    <BoundingBox
                                        //values are calculated in percentages relative to original image size
                                        left={correction.boundingBox.left - 2} 
                                        right={correction.boundingBox.right}
                                        top={correction.boundingBox.top}
                                        bottom={correction.boundingBox.bottom}
                                        issueType={correction.rule.issueType}
                                    />
                                )
                            })
                        }     
                    </div>
                    <div className="corrections-info">
                        <div><span className="corrections-count">{correctedImg.textData.corrections.length}</span><span>All suggestions</span></div>
                        {
                            correctedImg.textData.corrections.map((correction, idx) => {
                                const { text, offset, length } = correction.context;
                                return (
                                    <CorrectionMessage 
                                        message={correction.message} 
                                        shortMessage={correction.shortMessage} 
                                        issueType={correction.rule.issueType} 
                                        replacements={correction.replacements}
                                        incorrectText={text.slice(offset, offset + length)}
                                    />
                                )
                            })
                        }
                    </div>
                </>
            )
            : <h3>Loading</h3>
            }
        </main>
    )
}