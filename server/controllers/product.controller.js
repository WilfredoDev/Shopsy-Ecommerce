const Product = require('../db/models/product.model');
const Category = require('../db/models/category.model');

const getProducts = async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message})
    }

}

const createProduct = async(req,res)=>{
    try{
        const {
            name,
            description,
            price,
            categoryId,
            stock,
        } = req.body;
        const picture = req.file.originalname;
        const category = Category.findById(categoryId);
        if(!category){
            res.status(404).json({message:"Catefory not found"});
        }
        const newProduct = new Product({
            name,
            description,
            price,
            categoryId,
            stock,
            imageUrl: picture
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const findProduct = async(req,res) =>{
    try{
        const {id} = req.params;
        const currentProduct = await Product.findById(id);
        if(!currentProduct){
            res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(currentProduct);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {createProduct, findProduct, getProducts}