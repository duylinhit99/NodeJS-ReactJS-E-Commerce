const cartModel = require('../models/cartModel');
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Chuỗi bí mật của bạn

//lấy toàn bộ sản phẩm trong giỏ hàng
const getCartProduct = async (req, res) => {
    const products = req.body;

    // lấy danh sach id
    const productIds = Object.keys(products).map(id => parseInt(id));

    if (productIds.length === 0) {
        return res.status(400).json({ error: "No product" })
    }
    try {
        const productData = await cartModel.getProductCartById(productIds);
        // thêm số lượng qty vào dữ liệu từng sản phẩm
        const productsWithQuantity = productData.map(product => ({
            ...product, quantity: products[product.id]
        }));
        console.log(productsWithQuantity);
        return res.status(200).json(productsWithQuantity); // Trả về dữ liệu sản phẩm
    } catch (error) {
        console.error(error); // Ghi log lỗi
        return res.status(500).json({ error: "An error occurred while fetching products." });
    }

}

//tạo đơn hàng
const orderProduct = async (req, res) => {
    const userId = req.params.id;
    const product = req.body;  // Đảm bảo sử dụng đúng thuộc tính `products` từ `req.body`
    console.log(product);

    try {
        const order = await cartModel.createOrder(userId, product);
        console.log("Đơn hàng đã được tạo:", order);
        res.status(201).json({
            order: order,
            message: "Đơn hàng đã được tạo"
        });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ error: "Không thể tạo đơn hàng" });
    }
}

module.exports = {
    getCartProduct,
    orderProduct
}