const jwt = require('jsonwebtoken')
const JWT_SECRET = 'Hakuna-matata';
const {User} = require('../model.js');



const authenticateToken = async(req, res, next) => {

    const authHeader = req.headers['authorization'];
    console.log("This is the authHeader", authHeader);
    const authToken = authHeader.split(' ')[1];
    console.log(authToken);
    console.log("User model variable", User);
    if(!authToken){
        return res.status(401).json({
            message: "You are not authorised"
        })
    }
    jwt.verify(authToken, JWT_SECRET, (err, user) => {
        if(err){
            return res.status(411).json({
                message: "Fobidden"
            })
        }
        req.user = user;
    })
    const { id, password, iat } = req.user;
    console.log("This is from the middleware", req.user, id, password );
    const username = id;
    console.log("This is ther username formerly id: ", username);
    try{
        const user = await User.findOne({ username});
        if(!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error occured: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = authenticateToken;