module.exports = {
    getGrammarData,
}

async function getGrammarData(text) {
    const fetch = require('node-fetch')

    const encodedParams = new URLSearchParams();
    encodedParams.append("text", text);
    encodedParams.append("language", "en-US");

    const url = 'https://grammarbot.p.rapidapi.com/check';

    const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Host': 'grammarbot.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.GRAMMAR_BOT_KEY
    },
    body: encodedParams
    };

    try {
        const grammarData = await fetch(url, options).then(res => res.json());
        return grammarData;
    } catch (error) {
        console.log("Error:", error)
        return error
    }

}