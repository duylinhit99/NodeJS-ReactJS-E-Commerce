const categoryModel = require('../models/categoryModel')

// trả về 1 promise => không có async or await thì trả về promise,Pending>
const getCategory = async (req, res) => {
    const categories = await categoryModel.getCategory()
    console.log(categories);
    res.status(200).json({
        message: "SuccessFull",
        categories: categories
    })
}


module.exports = {
    getCategory
}