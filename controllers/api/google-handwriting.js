module.exports = {
    getHandwritingData,
}

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const fileName = '../../uploads/handwriting-example.png';

// Read a local image as a text document
async function getHandwritingData(fileName) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

	//my data
    const textData = {fullText: '', imgSize: [], words: []}; //imgSize: [width, height]

    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
	console.log("FULL TEXTTTTTTTT", fullTextAnnotation)
    const fullText = fullTextAnnotation.text;
	textData.fullText = fullText;
    console.log(`Full text: ${fullText}`);
    let cursor = 0;  
    fullTextAnnotation.pages.forEach(page => {
		const imageWidth = fullTextAnnotation.pages[0].width;
		const imageHeight = fullTextAnnotation.pages[0].height;
		textData.imgSize[0] = imageWidth;
		textData.imgSize[1] = imageHeight;  

		console.log({imageWidth, imageHeight})
		page.blocks.forEach(block => {
			// console.log(`Block confidence: ${block.confidence}`);
			block.paragraphs.forEach(paragraph => {
			//   console.log(`Paragraph confidence: ${paragraph.confidence}`);
			paragraph.words.forEach((word, idx) => {
				const wordText = word.symbols.map(s => s.text).join('');
				// console.log(`Word text: ${wordText}`);
				// console.log(`Word confidence: ${word.confidence}`);
				const vertices = word.boundingBox.vertices;
				// console.log('Verticies', vertices);  
		
				const offset = fullText.indexOf(wordText, cursor); //starting index of current word at or after the cursor position "hello hello".indexOf('hello', 0) --> gives first hello and indexOf('hello', 5) --> gives second
				cursor = offset + wordText.length; //update cursor position. In above example, cursor would be at idx 0+5 --> 5  "hello|hello"

				textData.words.push({
					text: wordText,
					confidence: word.confidence,
					boundingBox: { //calculate percentages for easy styling...some strange stuff going on with css
						left: ((vertices[3].x > vertices[0].x ? vertices[3].x : vertices[0].x) / imageWidth) * 100, // ((leftmost x) / width) * 100 
						right: ((imageWidth - (vertices[2].x > vertices[1].x ? vertices[2].x : vertices[1].x)) / imageWidth) * 100, // ((width - leftmost x) / width) * 100
						top: ((vertices[1].y > vertices[0].y ? vertices[1].y : vertices[0].y) / imageHeight) * 100, // (bottom-most y / height) * 100 
						bottom: ((imageHeight - (vertices[3].y > vertices[2].y ? vertices[3].y : vertices[2].y)) / imageHeight) * 100 // ((height - topmost y) / height) * 100
					},
					offset: offset,
					x1: vertices[0].x,
					y1: vertices[0].y,
					x2: vertices[1].x,
					y2: vertices[1].y,
					x3: vertices[2].x,
					y3: vertices[2].y,
					x4: vertices[3].x,
					y4: vertices[3].y,
				})
    
            //const offset = fullText.indexOf(wordText, cursor);
            //cursor = offset + wordLength;
            
          });
        });
      });
    });
    return textData;
}



//sample response
// {
//     "responses": [
//       {
//         "textAnnotations": [
//           {
//             "locale": "en",
//             "description": "Google Cloud\nPlatform\n",
//             "boundingPoly": {
//               "vertices": [
//                 {
//                   "x": 380,
//                   "y": 66
//                 },
//                 {
//                   "x": 714,
//                   "y": 66
//                 },
//                 {
//                   "x": 714,
//                   "y": 257
//                 },
//                 {
//                   "x": 380,
//                   "y": 257
//                 }
//               ]
//             }
//           },
//           {
//             "description": "Google",
//             "boundingPoly": {
//               "vertices": [
//                 {
//                   "x": 380,
//                   "y": 69
//                 },
//                 {
//                   "x": 544,
//                   "y": 67
//                 },
//                 {
//                   "x": 545,
//                   "y": 185
//                 },
//                 {
//                   "x": 381,
//                   "y": 187
//                 }
//               ]
//             }
//           },
//           {
//             "description": "Cloud",
//             "boundingPoly": {
//               "vertices": [
//                 {
//                   "x": 595,
//                   "y": 67
//                 },
//                 {
//                   "x": 713,
//                   "y": 66
//                 },
//                 {
//                   "x": 714,
//                   "y": 183
//                 },
//                 {
//                   "x": 596,
//                   "y": 184
//                 }
//               ]
//             }
//           },
//           {
//             "description": "Platform",
//             "boundingPoly": {
//               "vertices": [
//                 {
//                   "x": 426,
//                   "y": 189
//                 },
//                 {
//                   "x": 583,
//                   "y": 188
//                 },
//                 {
//                   "x": 583,
//                   "y": 256
//                 },
//                 {
//                   "x": 426,
//                   "y": 257
//                 }
//               ]
//             }
//           }
//         ],
//         "fullTextAnnotation": { 
//           "pages": [
//             {
//               "property": {
//                 "detectedLanguages": [
//                   {
//                     "languageCode": "en",
//                     "confidence": 1
//                   }
//                 ]
//               },
//               "width": 850,
//               "height": 550,
//               "blocks": [
//                 {
//                   "property": {
//                     "detectedLanguages": [
//                       {
//                         "languageCode": "en",
//                         "confidence": 1
//                       }
//                     ]
//                   },
//                   "boundingBox": {
//                     "vertices": [
//                       {
//                         "x": 380,
//                         "y": 69
//                       },
//                       {
//                         "x": 713,
//                         "y": 65
//                       },
//                       {
//                         "x": 714,
//                         "y": 183
//                       },
//                       {
//                         "x": 381,
//                         "y": 187
//                       }
//                     ]
//                   },
//                   "paragraphs": [
//                     {
//                       "property": {
//                         "detectedLanguages": [
//                           {
//                             "languageCode": "en",
//                             "confidence": 1
//                           }
//                         ]
//                       },
//                       "boundingBox": {
//                         "vertices": [
//                           {
//                             "x": 380,
//                             "y": 69
//                           },
//                           {
//                             "x": 713,
//                             "y": 65
//                           },
//                           {
//                             "x": 714,
//                             "y": 183
//                           },
//                           {
//                             "x": 381,
//                             "y": 187
//                           }
//                         ]
//                       },
//                       "words": [
//                         {
//                           "property": {
//                             "detectedLanguages": [
//                               {
//                                 "languageCode": "en"
//                               }
//                             ]
//                           },
//                           "boundingBox": {
//                             "vertices": [
//                               {
//                                 "x": 380,
//                                 "y": 69
//                               },
//                               {
//                                 "x": 544,
//                                 "y": 67
//                               },
//                               {
//                                 "x": 545,
//                                 "y": 185
//                               },
//                               {
//                                 "x": 381,
//                                 "y": 187
//                               }
//                             ]
//                           },
//                           "symbols": [
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 380,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 401,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 402,
//                                     "y": 186
//                                   },
//                                   {
//                                     "x": 381,
//                                     "y": 186
//                                   }
//                                 ]
//                               },
//                               "text": "G",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 404,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 425,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 426,
//                                     "y": 186
//                                   },
//                                   {
//                                     "x": 405,
//                                     "y": 186
//                                   }
//                                 ]
//                               },
//                               "text": "o",
//                               "confidence": 0.98
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 425,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 454,
//                                     "y": 69
//                                   },
//                                   {
//                                     "x": 455,
//                                     "y": 186
//                                   },
//                                   {
//                                     "x": 426,
//                                     "y": 186
//                                   }
//                                 ]
//                               },
//                               "text": "o",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 471,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 501,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 502,
//                                     "y": 185
//                                   },
//                                   {
//                                     "x": 472,
//                                     "y": 185
//                                   }
//                                 ]
//                               },
//                               "text": "g",
//                               "confidence": 1
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 499,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 519,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 520,
//                                     "y": 185
//                                   },
//                                   {
//                                     "x": 500,
//                                     "y": 185
//                                   }
//                                 ]
//                               },
//                               "text": "l",
//                               "confidence": 1
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ],
//                                 "detectedBreak": {
//                                   "type": "SPACE"
//                                 }
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 523,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 544,
//                                     "y": 68
//                                   },
//                                   {
//                                     "x": 545,
//                                     "y": 185
//                                   },
//                                   {
//                                     "x": 524,
//                                     "y": 185
//                                   }
//                                 ]
//                               },
//                               "text": "e",
//                               "confidence": 0.99
//                             }
//                           ],
//                           "confidence": 0.99
//                         },
//                         {
//                           "property": {
//                             "detectedLanguages": [
//                               {
//                                 "languageCode": "en"
//                               }
//                             ]
//                           },
//                           "boundingBox": {
//                             "vertices": [
//                               {
//                                 "x": 595,
//                                 "y": 67
//                               },
//                               {
//                                 "x": 713,
//                                 "y": 66
//                               },
//                               {
//                                 "x": 714,
//                                 "y": 183
//                               },
//                               {
//                                 "x": 596,
//                                 "y": 184
//                               }
//                             ]
//                           },
//                           "symbols": [
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 595,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 615,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 616,
//                                     "y": 184
//                                   },
//                                   {
//                                     "x": 596,
//                                     "y": 184
//                                   }
//                                 ]
//                               },
//                               "text": "C",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 620,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 635,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 636,
//                                     "y": 184
//                                   },
//                                   {
//                                     "x": 621,
//                                     "y": 184
//                                   }
//                                 ]
//                               },
//                               "text": "l",
//                               "confidence": 1
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 632,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 648,
//                                     "y": 67
//                                   },
//                                   {
//                                     "x": 649,
//                                     "y": 184
//                                   },
//                                   {
//                                     "x": 633,
//                                     "y": 184
//                                   }
//                                 ]
//                               },
//                               "text": "o",
//                               "confidence": 0.95
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 650,
//                                     "y": 66
//                                   },
//                                   {
//                                     "x": 675,
//                                     "y": 66
//                                   },
//                                   {
//                                     "x": 676,
//                                     "y": 183
//                                   },
//                                   {
//                                     "x": 651,
//                                     "y": 183
//                                   }
//                                 ]
//                               },
//                               "text": "u",
//                               "confidence": 0.94
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ],
//                                 "detectedBreak": {
//                                   "type": "LINE_BREAK"
//                                 }
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 684,
//                                     "y": 66
//                                   },
//                                   {
//                                     "x": 713,
//                                     "y": 66
//                                   },
//                                   {
//                                     "x": 714,
//                                     "y": 183
//                                   },
//                                   {
//                                     "x": 685,
//                                     "y": 183
//                                   }
//                                 ]
//                               },
//                               "text": "d",
//                               "confidence": 0.98
//                             }
//                           ],
//                           "confidence": 0.97
//                         }
//                       ],
//                       "confidence": 0.98
//                     }
//                   ],
//                   "blockType": "TEXT",
//                   "confidence": 0.98
//                 },
//                 {
//                   "property": {
//                     "detectedLanguages": [
//                       {
//                         "languageCode": "en",
//                         "confidence": 1
//                       }
//                     ]
//                   },
//                   "boundingBox": {
//                     "vertices": [
//                       {
//                         "x": 426,
//                         "y": 189
//                       },
//                       {
//                         "x": 583,
//                         "y": 188
//                       },
//                       {
//                         "x": 583,
//                         "y": 256
//                       },
//                       {
//                         "x": 426,
//                         "y": 257
//                       }
//                     ]
//                   },
//                   "paragraphs": [
//                     {
//                       "property": {
//                         "detectedLanguages": [
//                           {
//                             "languageCode": "en",
//                             "confidence": 1
//                           }
//                         ]
//                       },
//                       "boundingBox": {
//                         "vertices": [
//                           {
//                             "x": 426,
//                             "y": 189
//                           },
//                           {
//                             "x": 583,
//                             "y": 188
//                           },
//                           {
//                             "x": 583,
//                             "y": 256
//                           },
//                           {
//                             "x": 426,
//                             "y": 257
//                           }
//                         ]
//                       },
//                       "words": [
//                         {
//                           "property": {
//                             "detectedLanguages": [
//                               {
//                                 "languageCode": "en"
//                               }
//                             ]
//                           },
//                           "boundingBox": {
//                             "vertices": [
//                               {
//                                 "x": 426,
//                                 "y": 189
//                               },
//                               {
//                                 "x": 583,
//                                 "y": 188
//                               },
//                               {
//                                 "x": 583,
//                                 "y": 256
//                               },
//                               {
//                                 "x": 426,
//                                 "y": 257
//                               }
//                             ]
//                           },
//                           "symbols": [
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 426,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 448,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 448,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 426,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "P",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 456,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 473,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 473,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 456,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "l",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 471,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 484,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 484,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 471,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "a",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 488,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 508,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 508,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 488,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "t",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 518,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 535,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 535,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 518,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "f",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 535,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 546,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 546,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 535,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "o",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ]
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 546,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 560,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 560,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 546,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "r",
//                               "confidence": 0.99
//                             },
//                             {
//                               "property": {
//                                 "detectedLanguages": [
//                                   {
//                                     "languageCode": "en"
//                                   }
//                                 ],
//                                 "detectedBreak": {
//                                   "type": "LINE_BREAK"
//                                 }
//                               },
//                               "boundingBox": {
//                                 "vertices": [
//                                   {
//                                     "x": 566,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 583,
//                                     "y": 189
//                                   },
//                                   {
//                                     "x": 583,
//                                     "y": 256
//                                   },
//                                   {
//                                     "x": 566,
//                                     "y": 256
//                                   }
//                                 ]
//                               },
//                               "text": "m",
//                               "confidence": 0.99
//                             }
//                           ],
//                           "confidence": 0.99
//                         }
//                       ],
//                       "confidence": 0.99
//                     }
//                   ],
//                   "blockType": "TEXT",
//                   "confidence": 0.99
//                 }
//               ]
//             }
//           ],
//           "text": "Google Cloud\nPlatform\n"
//         }
//       }
//     ]
//   }