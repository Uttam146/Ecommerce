const jwt  = require("jsonwebtoken");
const {Users} = require('../models');
verifyToken = (req,res,next) =>{
    let token = req.header('access-token');
    if(!token){
        res.status(403).send({message:"Token is not added"});
    }
    jwt.verify(token,process.env.SECRET_KEY, async function(err,decoded){
        if(err){
            res.status(401).send({message:"Unauthroized"});
        }

        const userId = decoded.id;
        try{
        var user = await Users.findByPk(userId);
        var roles = await user.getRoles();
        }catch(err){
            res.status(401).send({message:"Internal server error.Pls connect admin"});
        }
        let eligibleRoles = [];
        req.user = user.dataValues;
        roles.forEach(role=>{
            eligibleRoles.push(role.name);
        })
        req.roles = eligibleRoles;
        req.allPermission = eligibleRoles.includes('superadmin');
        req.isUser = eligibleRoles.includes('user');
        next();
    })
    
}

const authJWT = {
    verifyToken:verifyToken
}

module.exports = authJWT;