const Image = require('../../models/image');
const { getHandwritingData } = require('./google-handwriting');
const fs = require('fs');

module.exports = {
    create,
    index,
    show
}

async function create(req, res) {
    try {
        const imgSrc = req.body.imgSrcBase64;
        const textData = await handleGoogleApiCall(imgSrc);
        console.log("TEXT DATA",textData);
        console.log('BOUNDING BOX', textData.words[0].boundingBox)
        const buffer = Buffer.from(imgSrc, "base64"); //convert to binary
        const newImage = await Image.create({user: req.user, imgSrc: buffer, textData: textData}) //storing src as binary...less expensive
        //Send back original base64 imgSrc, not binary. See 'transform' option on the image model
        res.json(newImage);
    } catch (error) {
        //client will check for non-2xx status code
        //400 = bad request
        res.status(400).json(error);
    }
}

async function index(req, res) {
    try {
        const images = await Image.find({user: req.user})
        res.json(images);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function show(req, res) {
    try {
        const image = await Image.findById(req.params.id);
        res.json(image);
    } catch (error) {
        res.status(400).json(error);
    }
}


/*-------Helper Functions--------*/
async function handleGoogleApiCall(base64Str) {
    const fileName = `${Date.now()}.png`

    //create file (handwriting api won't accept base64 as input...must be local file)
    fs.writeFile(fileName, base64Str, {encoding: 'base64'}, (err) => {
        if (err) return console.error(err)
        console.log('file saved to ', fileName)
    })
    
    //call api
    const textData = await getHandwritingData(fileName)
    //console.log("TEXT DATA",textData)

    //delete file
    fs.unlink(fileName, (err) => {
        if (err) throw err;
        console.log('File deleted');
    });

    return textData;
}