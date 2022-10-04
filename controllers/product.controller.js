const { Product, Category, Sequelize } = require('../models');
const {Op} = Sequelize;
exports.create = function (req, res) {

    if(!req.allPermission){
        console.log("hello");
        res.status(403).send({message:"Only superadmin is allowed to add/update/delete the product"})
    }
    
    const { name, description, cost, categoryId } = req.body;
    const product = {name,description,cost,categoryId};
    Product.create(product)
        .then(product => {
            res.status(201).send(product);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Something went wrong' });
        })
}


exports.getAll = (req, res) => {
    console.log(req.user);
    const { name, minCost, maxCost } = req.query;
    let productpromise = null;
    if (name) {
        productpromise = Product.findAll({
            where: {
                name: name
            }
        })
    }

    else if (minCost && maxCost) {
        productpromise = Product.findAll({
            where: {
                cost: {
                    [Op.between]: [minCost, maxCost]
                },
            }
        })
    } 
    else if (minCost) {
        productpromise = Product.findAll({
            where: {
                cost: {
                    [Op.gte]: minCost
                },
            }
        })
    }
    else if (maxCost) {
        productpromise = Product.findAll({
            where: {
                cost: {
                    [Op.lte]: maxCost
                },
            }
        })
    }
    else{
    productpromise  = Product.findAll();
    }
    productpromise
    .then(products =>{
        res.send(products);
    })
    .catch((err) => {
    res.status(500).send({ message: err.message || 'Something went wrong with server' });
    })
}
exports.getOne = (req, res) => {
    const productId = req.params.id;

    Product.findByPk(productId)
        .then((product) => {
            if (!product) {
                res.status(400).send({ message: `Category with id ${productId} not exists in database` });
            }
            res.status(201).send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.update = (req, res) => {
    if(!req.allPermission){
        console.log("hello");
        res.status(403).send({message:"Only superadmin is allowed to add/update/delete the product"})
    }
    const productId = req.params.id;
    const { name, description, cost } = req.body;
    const product = {};

    if (name) {
        product.name = name;
    }
    if (description) {
        product.description = description;
    }
    if (description) {
        product.cost = cost;
    }
    Product.update(product, {
        where: { id: productId }
    })
        .then((updatedProduct) => {
            res.status(201).send({ message: `${updatedProduct[0]} records updated successfully` });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.delete = (req, res) => {
    if(!req.allPermission){
        console.log("hello");
        res.status(403).send({message:"Only superadmin is allowed to add/update/delete the product"})
    }
    const productId = req.params.id;
    Product.destroy({
        where: {
            id: productId
        }
    })
        .then((data) => {
            res.status(201).send({ message: "Successfully deleted" });
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
}

exports.findProductsbyCategoryId = (req, res) => {
    const categoryId = req.params.categoryId;

    Product.findAll({
        where: {
            categoryId: categoryId
        }
    })
        .then((product) => {
            res.status(201).send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: `Something went wrong ${err.message}` });
        })
}

exports.findSpecificProductbyCategoryId = (req, res) => {
    const categoryId = req.params.categoryId;
    const productId = req.params.productId;
    Product.findAll({
        where: {
            categoryId: categoryId,
            id: productId
        }
    })
        .then((product) => {
            res.status(201).send(product);
        })
        .catch((err) => {
            res.status(500).send({ message: `Something went wrong ${err.message}` });
        })
}