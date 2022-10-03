const { Users, Role, Sequelize, ROLES } = require('../models');
const bcrypt = require('bcrypt');
exports.signup = async (req, res) => {

    var { username, email, password, roles } = req.body;
    if (!roles || !roles.length) {
        roles = [ROLES[0]];
    }
    try {
        const user = await Users.create({ username, email, password: bcrypt.hashSync(password, 8) })
        const userRoles = await Role.findAll({ where: { name: { [Sequelize.Op.or]: roles } } })
        await user.setRoles(userRoles);
        res.send({ message: 'user registered successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message || 'Something went wrong pls contact admin' });
    }

}

exports.signIn = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send({ message: "username or password cannot be empty" });
    }
    try {
        var user = await Users.findOne({ where: { username: username } })
    } catch (err) {
        res.status(500).send({ message:err.message});
    }
    if(!user){
        res.status(400).send({ message: "user not found" });
    }
    var isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        res.status(401).send({ message: "Invalid Password" });
    }
    res.send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles
    })
}
