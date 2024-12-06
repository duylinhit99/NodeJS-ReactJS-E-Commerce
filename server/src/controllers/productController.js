const productModel = require("../models/productModel");
const { PrismaClient } = require("../generated/client");
const prisma = new PrismaClient();
const prismaPagination = require('../utils/paginate')
// lấy toàn bộ sản phẩm
const getProduct = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const products = await prismaPagination(prisma.product, parseInt(page), parseInt(limit));
    // const products = await productModel.getProduct();
    res.json(products);
}

// chi tiết sản phẩm
const getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const productId = await productModel.getProductById(id);
    if (productId) {
        res.json(productId);
    } else {
        res.status(400).json({
            error: "Not Product"
        });
    }
}

const getProCategoryById = async (req, res) => {
    const id = parseInt(req.params.id);
    const { page = 1, limit = 10, search = "" } = req.query;
    // Gọi hàm phân trang
    const products = await prismaPagination(
        prisma.product, // Model Prisma
        parseInt(page), // Số trang
        parseInt(limit), // Số bản ghi mỗi trang
        { categoryId: id } // Điều kiện lọc
    );
    // const productCategoryId = await productModel.getProCategoryById(id);
    console.log(products);

    if (products) {
        res.json(products);
    } else {
        res.status(400).json({
            error: "Not Product"
        });
    }
}


module.exports = {
    getProduct,
    getProductById,
    getProCategoryById
}