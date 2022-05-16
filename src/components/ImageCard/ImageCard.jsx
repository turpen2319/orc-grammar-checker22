import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ImageCard.css';
export default function ImageCard({ img, window }) {
    return (
        <div className='ImageCard'>
            <Link to={`/corrections/${img._id}`}>
                <h4 className='card-title'>{img.textData.fullText.split(" ").slice(0,2).join(" ")}...</h4>
                <p>{img.textData.fullText}</p>
                <div className='card-info'>
                    <span className="corrections-count">{img.textData.corrections.length}</span>
                </div>
            </Link>
        </div>
       
    )
}