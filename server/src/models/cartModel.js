const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const getProductCartById = async (productIds) => {
    try {
        const productData = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        return productData;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Could not retrieve products");
    }
};

const createOrder = async (userId, product, status = "PENDING") => {
    if (!Array.isArray(product)) {
        throw new Error("products phải là một mảng");
    }

    try {
        const order = await prisma.$transaction(async (tx) => {
            // TẠO 1 ĐƠN HÀNG MỚI
            const newOrder = await tx.order.create({
                data: {
                    userId: parseInt(userId, 10),
                    total: product.reduce((acc, item) => acc + item.price * item.quantity, 0), //tính tổng
                    status: status,
                    items: {
                        create: product.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        }))
                    }
                },
                include: {
                    items: true,
                }
            })
            return newOrder;
        })
        console.log("Đơn hàng đã được tạo:", order);
        return order;
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        throw new Error("Không thể tạo đơn hàng");
    }
}

module.exports = {
    getProductCartById,
    createOrder
}