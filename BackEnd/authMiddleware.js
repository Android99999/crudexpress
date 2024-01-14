import express from 'express'
import jwt from "jsonwebtoken";

const secretKey = "Blyrae01";

const app = express();

export const authMiddleware = (req, res, next) => {

    const token = req.cookies.session;


    if(!token){
        console.log('NO TOKEN')
    return res.status(401).json({isValid: false, message: "Unauthorized Session!" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            console.log('FALSE TOKEN')
            return res.status(401).json({isValid: false, message: "Unauthorized Token!" });
        }

        req.user = decoded;
        return res.status(200).json({user: req.user, isValid: true, message: "Authorized Token!" })
        
    })
}

export default authMiddleware;


