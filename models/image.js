const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },

    imgSrc: {
        type: Buffer, //stored in binary...need to convert at some point when querying for created images
        required: true
    },

    extractedText: {
        type: String, 
        default: null
    },

    grammarData: {
        type: Object, 
        default: null
    },

}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            ret.imgSrc = doc.imgSrc.toString('base64'); //sends imgSrc as base64 instead of buffer
            return ret
        }
    }
})

module.exports = mongoose.model('Image', imageSchema)