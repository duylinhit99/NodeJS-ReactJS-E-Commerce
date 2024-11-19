const { PrismaClient } = require('../generated/client');
const prisma = new PrismaClient();

const getCategory = async () => {
    const categories = await prisma.category.findMany();
    return categories;
}

module.exports = {
    getCategory
}