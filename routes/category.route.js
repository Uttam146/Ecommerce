const categoryController = require('../controllers/category.controller');
const {requestValidator,authJWT} = require('../Middlewares');
module.exports = (app) => {

    // create a new category
    app.post('/ecom/api/v1/category',[requestValidator.validateCategoryRequest,authJWT.verifyToken],categoryController.create);
    app.get('/ecom/api/v1/category',categoryController.getAll);
    app.get('/ecom/api/v1/category/:id',categoryController.getOne);
    app.put('/ecom/api/v1/category/:id',[authJWT.verifyToken],categoryController.update);
    app.delete('/ecom/api/v1/category/:id',[requestValidator.validateCategoryDeleteRequest,authJWT.verifyToken],categoryController.delete);
}