const Category = require('../db/models/category.model');

const create = async(req,res)=>{
    try{
        const{
            name,
            description,
        } = req.body

        const newCategory = new Category({
            name,
            description
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getCategories = async(req,res)=>{
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const getCategory = async(req,res)=>{
    try{
        const {id} = req.params
        const category = await Category.findById(id);
        if(!category) return res.status(404).json({message: "Category does not exist"});
        res.status(200).json(category);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {create, getCategories, getCategory }