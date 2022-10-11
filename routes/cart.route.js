const {authJWT} = require('../Middlewares');
const cartController = require('../controllers/cart.controller');
module.exports = function(app) {

    app.post('/ecom/api/v1/carts',[authJWT.verifyToken],cartController.create);
    app.put("/ecom/api/v1/carts",[authJWT.verifyToken],cartController.update);
    app.get('/ecom/api/v1/carts',[authJWT.verifyToken],cartController.findCart);
    app.delete("/ecom/api/v1/carts/products/:id",[authJWT.verifyToken],cartController.deleteProductFromCart);

}