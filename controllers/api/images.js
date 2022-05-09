const Image = require('../../models/image');

module.exports = {
    create,
    index,
    show
}

async function create(req, res) {
    try {
        const imgSrc = req.body.imgSrcBase64;
        const buffer = Buffer.from(imgSrc, "base64"); //convert to binary
        const newImage = await Image.create({user: req.user, imgSrc: buffer}) //storing as binary...less expensive
        //Send back original base64 imgSrc, not binary
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