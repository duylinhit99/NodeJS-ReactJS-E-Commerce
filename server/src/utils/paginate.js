const prismaPagination = async (prismaModel, page = 1, limit = 10, where = {}, orderBy = {}) => {
    try {
        // kiểm tra tính hợp lệ
        /**
         * prismaModel.findMany => lấy toàn bộ danh sách dữ liệu
         * prismaNodel.count => đếm tổng số bản ghi
         */
        if (!prismaModel || typeof prismaModel.findMany !== "function" || typeof prismaModel.count !== "function") {
            throw new Error("Invalid Prisma model passed to pagination utility.");
        }

        // tính skip => tính số lượng recort bỏ qua 
        const skip = (page - 1) * limit;

        // đếm tổng bản ghi theo điều kiện
        const totalItems = await prismaModel.count({ where });

        // lấy dữ liệu 
        const items = await prismaModel.findMany({
            where,
            orderBy,
            skip,
            take: limit
        });

        // tính tổng page
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: items,
            meta: {
                totalItems,
                totalPages,
                currentPage: page,
                perPage: limit
            }
        }
    } catch (error) {
        console.error("Error in pagination:", error.message);
        throw new Error("Pagination failed");
    }
}

module.exports = prismaPagination