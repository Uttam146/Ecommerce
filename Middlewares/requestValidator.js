const { Category, Product } = require('../models');
const validateCategoryRequest = (req, res, next) => {

    if (!req.body.name) {
        res.status(400).send({ message: "Name cannot be empty" });
    }
    next();

}

const validateProductRequest = (req, res, next) => {

    if (!req.body.name || !req.body.cost) {
        res.status(400).send({ message: "Name or cost of the product cannot be empty" });
        return;
    }
    if (!req.body.categoryId) {
        res.status(400).send({ message: "categoryId of the product cannot be empty" });
        return;
    }
    Category.findByPk(req.body.categoryId)
        .then(category => {
            if (!category) {
                res.status(400).send({ message: `CATEGORY ID PASSED : ${req.body.categoryId} is not available` });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}

const validateCategoryDeleteRequest = (req, res, next) => {

    Category.findByPk(req.params.id)
        .then((category) => {
            if (!category) {
                res.status(400).send({ message: `Category with id ${req.params.id} not exists in database` });
                return;
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
        

}

const validateProductDeleteRequest = (req, res, next) => {

    Product.findByPk(req.params.id)
        .then((product) => {
            if (!product) {
                res.status(400).send({ message: `Category with id ${productId} not exists in database` });
                return;
            }
            next();
        })
        .catch((err) => {
            res.status(500).send({ message: 'Something went wrong with server' });
        })
    

}

const validateCategoryPassed = (req, res, next) => {

    const categoryId = parseInt(req.params.categoryId);

    if(!categoryId){
        res.status(400).send({message:"Category Id is not passed or is of invalid data type"});
    }

    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                res.status(400).send({ message: `CATEGORY ID PASSED : ${req.params.categoryId} is not available` });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}

const validateCategoryAndProductPassed = (req, res, next) => {

    const categoryId = parseInt(req.params.categoryId);
    const productId = parseInt(req.params.productId);

    if(!categoryId){
        res.status(400).send({message:"Category Id is not passed or is of invalid data type"});
    }
    if(!productId){
        res.status(400).send({message:"Product Id is not passed or is of invalid data type"});
    }
    Category.findByPk(categoryId)
        .then(category => {
            if (!category) {
                res.status(400).send({ message: `CATEGORY ID PASSED : ${req.params.categoryId} is not available` });
                return;
            }
            Product.findByPk(productId)
            .then(product => {
                if (!product) {
                    res.status(400).send({ message: `Product ID PASSED : ${productId} is not available` });
                    return;
                } 
                next();
            })
            
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong" });
        })
}

module.exports = {
    validateCategoryRequest: validateCategoryRequest,
    validateProductRequest: validateProductRequest,
    validateCategoryDeleteRequest: validateCategoryDeleteRequest,
    validateProductDeleteRequest: validateProductDeleteRequest,
    validateCategoryPassed:validateCategoryPassed,
    validateCategoryAndProductPassed:validateCategoryAndProductPassed

}