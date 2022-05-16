import { useNavigate } from "react-router-dom"
import * as imagesApi from '../../utilities/images-api'
import './ImgPreview.css'

export default function ImgPreview({ imgSrc }) {
    const navigate = useNavigate()
    async function handleImgSubmit() {
        const cleanedSrc = imgSrc.slice(imgSrc.indexOf(',') + 1); //remove file metadata for buffer encoding/decoding
        const checkedImg = await imagesApi.createCheckedImg(cleanedSrc);
        navigate(`/corrections/${checkedImg._id}`)
    }

    return (
        <div className="ImgPreview flex-ctr-ctr flex-col">
            <img src={imgSrc} alt="preview" />
            <div className="preview-btns">
                <button onClick={()=>navigate('/webcam')}>Retake</button>
                <button 
                    onClick={() => {
                        navigate('/load/corrections')
                        handleImgSubmit()
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}