const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 6;

module.exports = {
    create,
    login,
};

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        // token will be a string
        const token = createJWT(user)
        // Yes, we can use res.json to send back just a string
        // The client code needs to take this into consideration
        res.json(token);
    } catch (error) {
        //client will check for non-2xx status code
        //400 = bad request
        res.status(400).json(error);
    }
    
}

async function login(req, res) {
    try {
        const user = await User.findOne({'email':req.body.email});
        if(!user) throw new Error("user with that email doesn't exist")
        const match = await bcrypt.compare(req.body.password, user.password); 
    
        if(!match) throw new Error('username and/or password did not match')
        const token = createJWT(user)
        res.json(token);

    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        // payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h'}
    );
}