const {signUpValidator} = require('../Middlewares');

module.exports = function(app){


    app.post('/ecom/api/v1/auth/signup',signUpValidator.checkDuplicateEmailOrUsername);
}