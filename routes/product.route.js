const productController = require('../controllers/product.controller');
const {requestValidator} = require('../Middlewares');
module.exports = (app) =>{

    app.post('/ecom/api/v1/products',requestValidator.validateProductRequest,productController.create);
    app.get('/ecom/api/v1/products',productController.getAll);
    app.get('/ecom/api/v1/products/:id',productController.getOne);
    app.put('/ecom/api/v1/products/:id',productController.update);
    app.delete('/ecom/api/v1/products/:id',productController.delete);
    app.get('/ecom/api/v1/category/:categoryId/products',requestValidator.validateCategoryPassed,productController.findProductsbyCategoryId);
    app.get('/ecom/api/v1/category/:categoryId/products/:productId',requestValidator.validateCategoryAndProductPassed,productController.findSpecificProductbyCategoryId);
}