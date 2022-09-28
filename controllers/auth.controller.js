const { Users, Role, Sequelize, ROLES } = require('../models');
const bcrypt = require('bcrypt');
exports.signup = (req, res) => {

    var { username, email, password, roles } = req.body;
    if(!roles || !roles.length){
        roles = [ROLES[0]];
    }
    Users.create({
        username,
        email,
        password:bcrypt.hashSync(password,8)
    })
        .then(user => {
                Role.findAll({
                    where: {
                        name: {
                            [Sequelize.Op.or]: roles
                        }
                    }
                })
                .then(roles => {
                        user.setRoles(roles)
                        .then(()=>{
                            res.send({message:'user registered successfully'})
                        })
                    })
        })
    .catch(err=>{
        res.status(500).send({message:'Something went wrong pls contact admin'});
    })

}