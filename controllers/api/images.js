const Image = require('../../models/image');
const { getHandwritingData } = require('./google-handwriting');
const { getGrammarData } = require('./grammar-check');
const fs = require('fs');

module.exports = {
    create,
    index,
    show
}

async function create(req, res) {
    try {
        const imgSrc = req.body.imgSrcBase64;
        const imageTextData = await handleGoogleApiCall(imgSrc);
        
        console.log('BOUNDING BOX', imageTextData.words[0].boundingBox)
        const grammarAndImageTextData = await integrateGrammarAndImageTextData(imageTextData);
        console.log('COMPLETE DATA',grammarAndImageTextData);
        const buffer = Buffer.from(imgSrc, "base64"); //convert to binary
        const newImage = await Image.create({user: req.user, imgSrc: buffer, textData: grammarAndImageTextData}) //storing src as binary...less expensive
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
    try {
        //create file (handwriting api won't accept base64 as input...must be local file)
        fs.writeFile(fileName, base64Str, {encoding: 'base64'}, (err, doc) => {
            console.log("DOC!!!!!", doc);
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
        
    } catch (error) {
       console.log("ERRORRR", error); 
    }

    return textData;
}


async function integrateGrammarAndImageTextData(textData) {
     const grammarData = await getGrammarData(textData.fullText);
     console.log('GRAMMAR MATCHES FROM INT FUNC', grammarData.matches, 'WORDS DATA FROM FUNC', textData.words)
     textData['corrections'] = []
     for(let mistake of grammarData.matches) {
         for(let word of textData.words) {
             console.log('MISTAKE:', mistake, 'WORD:', word, 'WORD OFFSET:', word['offset'])
             if(mistake.offset === word.offset && word.confidence > 0.85) {
                mistake['boundingBox'] = word.boundingBox;
                textData['corrections'].push(mistake);
                break;
             }
         }
     }
     return textData;
}