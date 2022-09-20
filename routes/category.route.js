const categoryController = require('../controllers/category.controller')
module.exports = (app) => {

    // create a new category
    app.post('/ecom/api/v1/category',categoryController.create);
    app.get('/ecom/api/v1/category',categoryController.getAll);
    app.get('/ecom/api/v1/category/:id',categoryController.getOne);
    app.put('/ecom/api/v1/category/:id',categoryController.update);
    app.delete('/ecom/api/v1/category/:id',categoryController.delete);
}