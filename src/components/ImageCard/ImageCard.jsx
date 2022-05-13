import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ImageCard.css';
export default function ImageCard({ img, window }) {
    return (
        <div className='ImageCard'>
            <Link to={`/corrections/${img._id}`}>
                <img src={`data:image/png;base64,${img.imgSrc}`} width={200}/>
            </Link>
        </div>
    )
}