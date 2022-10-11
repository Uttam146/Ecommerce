
module.exports = (Sequelize, sequelize) => {
    const cart = sequelize.define('cart', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cost:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
    })
    return cart;
}