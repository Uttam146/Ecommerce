const categoryController = require('../controllers/category.controller');
const {requestValidator} = require('../Middlewares');
module.exports = (app) => {

    // create a new category
    app.post('/ecom/api/v1/category',requestValidator.validateCategoryRequest,categoryController.create);
    app.get('/ecom/api/v1/category',categoryController.getAll);
    app.get('/ecom/api/v1/category/:id',categoryController.getOne);
    app.put('/ecom/api/v1/category/:id',categoryController.update);
    app.delete('/ecom/api/v1/category/:id',requestValidator.validateCategoryDeleteRequest,categoryController.delete);
}