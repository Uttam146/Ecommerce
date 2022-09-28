const {User} = require('../models');
const checkDuplicateEmailOrUsername = (req,res,next) =>{
    const {userName,email} = req.body;

    const checkUserName = User.findOne({
        where:{
            username:userName
        }
    })
    const checkUserEmail =  User.findOne({
        where:{
            email:email
        }
    })

    Promise.all([checkUserName,checkUserEmail]).then(users=>{
        if(users[0] || users[1]){
            res.status(500).send({message:  'Username or email is already exists in database'}); 
            return;
        }
        next();
    });
}

const verifySignUp = {
    checkDuplicateEmailOrUsername
}

module.exports = verifySignUp