const productController = require('../controllers/product.controller');
const {requestValidator,authJWT} = require('../Middlewares');
module.exports = (app) =>{

    app.post('/ecom/api/v1/products',[requestValidator.validateProductRequest,authJWT.verifyToken],productController.create);
    app.get('/ecom/api/v1/products',productController.getAll);
    app.get('/ecom/api/v1/products/:id',productController.getOne);
    app.put('/ecom/api/v1/products/:id',[authJWT.verifyToken],productController.update);
    app.delete('/ecom/api/v1/products/:id',[authJWT.verifyToken],productController.delete);
    app.get('/ecom/api/v1/category/:categoryId/products',requestValidator.validateCategoryPassed,productController.findProductsbyCategoryId);
    app.get('/ecom/api/v1/category/:categoryId/products/:productId',requestValidator.validateCategoryAndProductPassed,productController.findSpecificProductbyCategoryId);
}