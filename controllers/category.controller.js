const db = require('../models');
const Category = db.Category;
exports.create = function (req, res) {

    const { name, description } = req.body;
    //console.log(req.body);
    if (!name) {
        res.status(400).send({ message: "Name cannot be empty" });
    }

    const category = {
        name: name,
        description: description
    }

    Category.create(category)
        .then(category => {
            console.log(`category with name ${category.name} is created successfully`);
            res.status(201).send(category);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.getAll = (req, res) => {
    Category.findAll()
        .then((categories) => {
            res.status(201).send(categories);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}
exports.getOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                res.status(400).send({ message: `Category with id ${categoryId} not exists in database` });
            }
            res.status(201).send(category);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.update = (req, res) => {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    const category = {};

    if (name) {
        category.name = name;
    }
    if (description) {
        category.description = description;
    }
    Category.update(category, {
        where: { id: categoryId }
    })
        .then((updatedCategory) => {
            res.status(201).send({ message: `${updatedCategory[0]} records updated successfully` });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.delete = (req, res) => {

    const categoryId = req.params.id;

    Category.findByPk(categoryId)
        .then((category) => {
            if (!category) {
                res.status(400).send({ message: `Category with id ${categoryId} not exists in database` });
            }
            Category.destroy({
                where: {
                    id: categoryId
                }
            })
                .then((data) => {
                    res.status(201).send({message:"Successfully deleted"});
                })
                .catch((err) => {
                    res.status(500).send({ message: 'Something went wrong with server' });
                })
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })

    
}
