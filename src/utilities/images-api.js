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
    console.log("GET ONE CLIENT API FUNC")
    console.log({imageId})
    const res = await fetch(`${BASE_URL}/${imageId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    })

    if (res.ok) return res.json();
    throw new Error('Bad Request');
}
// // Fetch takes an optional options object as the 2nd argument
// // used to include a data payload, set headers, etc. 
// const options = { 'POST' };
// if (payload) {
//     options.headers = { 'Content-Type': 'application/json' };
//     options.body = JSON.stringify(payload);
// }
// const token = getToken();
// if (token) {
//     // Ensure headers object exists
//     options.headers = options.headers || {};
//     // Add token to an Authorization header
//     // Prefacing with 'Bearer' is recommended in the HTTP specification
//     options.headers.Authorization = `Bearer ${token}`;
// }
// const res = await fetch(url, options);
// // res.ok will be false if the status code set to 4xx in the controller action
// if (res.ok) return res.json();
// throw new Error('Bad Request');