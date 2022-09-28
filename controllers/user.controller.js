const {Users} = require('../models');

exports.getAll = (req, res) => {
    Users.findAll()
        .then((categories) => {
            res.status(201).send(categories);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}