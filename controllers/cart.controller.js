const {Cart,Product,Users} = require('../models');
const { where } = require("sequelize");

exports.create = async (req,res) =>{
    if(!req.isUser){
        res.status(403).send({message:"Only user is allowed to add/update/delete the cart"})
    }
    try{
    const userId  = req.user.id;
    const user = await Users.findByPk(userId);
    const cart = await Cart.create({userId:userId});
    res.send({message:"cart created successfully"})
    }catch(err){
        res.status(500).send({message:err.message || "Something went wrong"});
    }
}
exports.update = async (req,res) =>{
    const userId  = req.user.id;

    const user = await Users.findByPk(userId);
    const cart = await user.getCart();
    res.send(cart);
    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);
    
    const newProducts = await Product.findAll({where:{id:req.body.products}});

    if(!newProducts){
        res.status(400).send({message:"No product exists from the given product Id's"});
    }

    const existingproducts= await userCart.getProducts();

    const updatedProducts=[...existingproducts, ...newProducts];

    //calculate the updated cost 

    const totalCost = findTotalCost(updatedProducts);

    //update the cart model with totalCost 

    await Cart.update({cost:totalCost},{where:{
        id:cart.id
    }});

    await userCart.setProducts(updatedProducts);

    res.send(updatedProducts);
}

exports.findCart = async (req,res) =>{
    const {cart,products} = await findCartAndProducts(req.user.id);
    res.send({products,totalCost:cart.cost});
}

exports.deleteProductFromCart = async (req,res)=>{

    const productId=parseInt(req.params.id);

    const userId=req.user.id;

    const user= await Users.findByPk(userId);
 
    const cart = await user.getCart();

    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);

    const existingproducts= await userCart.getProducts();

    const updatedProducts = existingproducts.filter((product)=>{
        return product.id!==productId;
    })

  //calculate the updated cost 

  const totalCost = findTotalCost(updatedProducts);

  //update the cart model with totalCost 

  await Cart.update({cost:totalCost},{where:{
      id:cart.id
  }});
  
    await userCart.setProducts(updatedProducts);

    res.send(updatedProducts);

}


const findCartAndProducts = async (userId)=>{

    const user= await Users.findByPk(userId);
 
    const cart = await user.getCart();

    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);

    const existingproducts= await userCart.getProducts();

    return  {cart:userCart,products:existingproducts};
}

const findTotalCost=(products)=>{
    let cost=0;
    for(let i=0;i<products.length;i++){
        cost+= products[i].cost;
    }
    return cost;
}