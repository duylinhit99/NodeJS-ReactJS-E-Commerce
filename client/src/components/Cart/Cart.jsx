import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import api from '../../api';
import { toast } from 'react-toastify';
const Cart = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            api.post('/cart/products', cart).then(res => {
                setData(res.data)
            })
        }
    }, [])

    const hanldeDelete = (e) => {
        // Lấy ID từ sự kiện
        let id = e.currentTarget.id
        if (!id) {
            console.error("ID không được tìm thấy!");
            return;
        }
        // tạo newData
        const newData = data.filter(item => item.id.toString() !== id); // Chuyển đổi ID thành chuỗi để so sánh
        // Nếu không có sản phẩm nào trong newData, log cảnh báo
        if (newData.length === data.length) {
            console.warn(`Sản phẩm với ID ${id} không tồn tại.`);
            return;
        }
        // lấy cart local ra 
        // Cập nhật cart trong localStorage
        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
            delete cart[id]; // Xóa sản phẩm khỏi cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Lưu lại vào localStorage
        }
        setData(newData)
        toast.success("Delete successfully")
    }
    const renderData = () => {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((item, i) => {
                return (
                    <>
                        {/* <!-- Sản phẩm 1 --> */}
                        <tr tr class="border-b transition duration-300" >
                            <td class="py-2 px-6 flex items-center">
                                <img class="w-20 h-20 rounded-md mr-4 shadow" src={data[item].image} alt="Product Image" />
                                <span class="text-lg font-semibold text-gray-800 dark:text-white">{data[item].title}</span>
                            </td>
                            <td class="py-2 px-6">
                                <div class="flex items-center justify-center border-gray-300 rounded">
                                    <button class="px-2 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300">-</button>
                                    <input type="text" class="w-12 text-center border-none outline-none" value={data[item].quantity} />
                                    <button class="px-2 py-1 bg-gray-200 text-gray-600 hover:bg-gray-300">+</button>
                                </div>
                            </td>
                            <td class="py-2 px-6 text-center">
                                <span class="text-lg font-semibold text-gray-800 dark:text-white" id={data[item].id}>{data[item].quantity * data[item].price}$</span>
                            </td>
                            <td class="py-2 px-6 text-center">
                                <button class="text-red-500 hover:text-red-600 transition duration-300"
                                    id={data[item].id}
                                    onClick={hanldeDelete}><MdDelete className='text-3xl' /></button>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    }
    return (
        <div class="container mx-auto dark:bg-slate-800">
            <h1 class="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Shopping Cart</h1>

            <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-800">
                <thead class="bg-gray-200 dark:bg-slate-800">
                    <tr>
                        <th class="py-4 px-6 text-left text-lg font-semibold text-gray-700 dark:text-white">Product</th>
                        <th class="py-4 px-6 text-lg font-semibold text-gray-700 dark:text-white">Quantity</th>
                        <th class="py-4 px-6 text-lg font-semibold text-gray-700 dark:text-white">Price</th>
                        <th class="py-4 px-6 text-lg font-semibold text-gray-700 dark:text-white">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- Sản phẩm 1 --> */}
                    {renderData()}
                </tbody>
            </table>

            {/* <!-- Tổng thanh toán --> */}
            <div class="mt-8 bg-white shadow-lg rounded-lg p-6 dark:bg-slate-800">
                <h2 class="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>

                <div class="flex justify-between border-b pb-2 dark:text-white">
                    <p class="text-lg">Subtotal:</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">$49.98</p>
                </div>

                <div class="flex justify-between border-b py-2 dark:text-white">
                    <p class="text-lg">Shipping:</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">$5.00</p>
                </div>

                <div class="flex justify-between border-b py-2">
                    <p class="text-lg font-semibold dark:text-white">Total:</p>
                    <p class="text-2xl font-bold text-blue-600 dark:text-white">$54.98</p>
                </div>

                <div class="flex justify-end mt-4">
                    <button class="w-[200px] py-3 bg-primary text-white rounded-lg hover:scale-105 transform transition duration-300">Buy</button>
                </div>
            </div>
        </div>

    )
}

export default Cart