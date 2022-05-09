import { Link } from 'react-router-dom';
export default function ImageCard({ img }) {
    return (
        <Link to={`/corrections/${img._id}`}>
            <img src={`data:image/png;base64,${img.imgSrc}`} width={200}/>
        </Link>
    )
}