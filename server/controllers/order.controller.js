const Order = require('../db/models/order.model');
const OrderProduct = require('../db/models/order-products.model');
const Customer = require('../db/models/customer.model');
const Product = require('../db/models/product.model');

const createOrder = async(req,res, next) =>{
    try{
        const {data} = req.body
        const customer = await Customer.findOne({userId: req.user.id});
        if(!customer){
            res.status(500).json({message:"Server Error"});
        }
        const newOrder = new Order({
            customerId: customer._id
        });
        await newOrder.save();
        data.map(async(object)=>{
            await addProductToOrder(object.productId,object.amount, newOrder._id, res);
        })
        res.status(201).json({order:newOrder});
    }catch(error){
        next(error);
    }
}

const addProductToOrder = async(productId, amount, orderId, res)=>{
    try{
        const order = await Order.findById(orderId);
        if(!order){
            res.json({message:'Order not found'})
        };
        const product = await Product.findById(productId);
        if(!product){
            res.json({message:'Product not found'})
        };
        const orderProduct = new OrderProduct({
            orderId,
            productId,
            amount
        });
        await orderProduct.save();
        return orderProduct;
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const customer = await Customer.findOne({ userId });
        
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        
        const customerId = customer._id;
        const orders = await Order.find({ customerId });
        
        const ordersWithProducts = await Promise.all(orders.map(async (order) => {
            const orderProducts = await OrderProduct.find({ orderId: order._id });
            
            const productsWithData = await Promise.all(orderProducts.map(async (orderProduct) => {
                const productData = await Product.findById(orderProduct.productId);
                return { ...orderProduct.toObject(), data: productData };
            }));

            return { ...order.toObject(), products: productsWithData };
        }));
        
        res.json(ordersWithProducts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getOrder = async(req,res)=>{
    try{
        const {orderId}=req.params;
        const order=await Order.findById(orderId);
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:'error'});
    }
}

const getOrderProducts = async(req,res)=>{
    try{
        const {orderId}=req.params;
        const orderProducts = await OrderProduct.find({orderId});
        res.status(200).json(orderProducts);
    }catch(error){
        res.status(500).json({message:'error'});
    }
}

module.exports = {createOrder, getOrders, getOrder, getOrderProducts};