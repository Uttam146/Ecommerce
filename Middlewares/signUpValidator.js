const {Users,ROLES} = require('../models');
const checkDuplicateEmailOrUsername = (req,res,next) =>{
    const {username,email} = req.body;
    console.log(username,email);
    const checkUserName = Users.findOne({
        where:{
            username:username
        }
    })
    const checkUserEmail =  Users.findOne({
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

const checkRoleExists = (req,res,next) =>{
        const roles = req.body.roles;
        if(roles){
            for(let i=0;i<roles.length;i++){
                if(!ROLES.includes(roles[i])){
                    res.status(500).send({message:  'Roles not exists in database'}); 
                }
            }
        }
        next();
}
const verifySignUp = {
    checkDuplicateEmailOrUsername,
    checkRoleExists
}

module.exports = verifySignUp