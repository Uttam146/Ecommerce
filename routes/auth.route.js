const {signUpValidator} = require('../Middlewares');
const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    
    app.post('/ecom/api/v1/auth/signup',
    [signUpValidator.checkDuplicateEmailOrUsername,signUpValidator.checkRoleExists],
    authController.signup);

    app.post('/ecom/api/v1/auth/signin',authController.signIn);
}