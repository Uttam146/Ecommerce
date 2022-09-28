const userController = require('../controllers/user.controller');
module.exports = (app) =>{

    app.get('/ecom/api/v1/user',userController.getAll);
}