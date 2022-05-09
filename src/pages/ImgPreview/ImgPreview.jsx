import { useNavigate } from "react-router-dom"
import * as imagesApi from '../../utilities/images-api'

export default function ImgPreview({ imgSrc }) {
    const navigate = useNavigate()

    async function handleImgSubmit() {
        const cleanedSrc = imgSrc.slice(imgSrc.indexOf(',') + 1); //remove file metadata for buffer encoding/decoding
        console.log({cleanedSrc});
        const checkedImg = await imagesApi.createCheckedImg(cleanedSrc);
        console.log(checkedImg.imgSrc)
        navigate('/')

    }

    return (
        <>
            <img src={imgSrc} alt="preview the photo" />
            <button onClick={()=>navigate('/webcam')}>Retake</button>
            <button onClick={handleImgSubmit}>Submit</button>
        </>
    )
}