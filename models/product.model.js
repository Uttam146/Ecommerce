module.exports = (Sequilize, sequilize) => {

    const Product = sequilize.define('product', {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequilize.STRING,
        },
        cost: {
            type: Sequilize.INTEGER,
            allowNull: false,
        },
        categoryId: {
            type: Sequilize.INTEGER
        },

    }, {
        tablename: 'produts'
    });
    return Product;
}