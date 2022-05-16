import { getToken } from './users-service';

const BASE_URL = '/api/images'

export async function createCheckedImg(cleanedSrc) {
    const token = getToken(); //returns null if no token

    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({
            imgSrcBase64: cleanedSrc
        })
      
    })

    if (res.ok) return res.json(); //this json response is being awaited in the ImgPreview handle submit function
    throw new Error('Bad Request');
}

export async function getAll() {
    const token = getToken();

    const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},  
    })

    if (res.ok) return res.json();
    throw new Error('Bad Request');
}

export async function getOne(imageId) {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/${imageId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    })

    if (res.ok) return res.json();
    throw new Error('Bad Request');
}
