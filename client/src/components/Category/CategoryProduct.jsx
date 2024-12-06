import React, { useEffect, useState } from 'react'
import api from '../../api'
import AddCart from '../Cart/AddCart';
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
const CategoryProduct = () => {
    let param = useParams();
    const [currentPage, setCurrentPage] = useState(1) //page hiện tại
    const [totalPages, setTotalPages] = useState(1) //tổng số trang
    let id = param.id
    let limit = 10
    const [data, setData] = useState({})

    const fetchProducts = async (page = 1) => {
        try {
            const res = await api.get(`category/${id}/products?page=${page}&limit=${limit}`)
            console.log(res);
            setData(res.data.data)
            setTotalPages(res.data.meta.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.log("Lỗi khi gọi API", error)
        }
    }

    // Gọi API khi component render lần đầu
    useEffect(() => {
        fetchProducts(1); // Lấy dữ liệu trang đầu tiên
    }, []);

    // Hàm xử lý chuyển trang
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            fetchProducts(page);
        }
    };

    const handleAddToCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        cart[id] = (cart[id] || 0) + 1; // Tăng số lượng, khởi tạo là 1 nếu chưa có
        localStorage.setItem('cart', JSON.stringify(cart))

        const tongQty = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        localStorage.setItem('tongQty', JSON.stringify(tongQty))

        if (cart) {
            toast.success("Added successfully");
        }
    };
    const renderProduct = () => {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((key, index) => {
                return (
                    <div
                        data-aos="fade-up"
                        key={data[key].id} className='space-y-3 group'>
                        <img src={data[key].image} alt="" className='h-[220px] w-[150px] object-cover rounded-md' />
                        <h3 className='font-semibold dark:text-white'>{data[key].title}</h3>
                        <span className='text-sm text-gray-600'>{data[key].color}</span>
                        <div className='flex justify-between'>
                            <span className='dark:text-white flex items-center gap-1'><FaStar className='text-yellow-400' />{data[key].rate}</span>
                            <span className='dark:text-white'>{data[key].price}$</span>
                        </div>
                        <div className='bg-primary rounded-md justify-center mx-auto text-center w-[100px] flex flex-col'>
                            <AddCart id={data[key].id} onAddToCart={handleAddToCart} />
                        </div>
                        <div className='bg-primary rounded-md justify-center mx-auto text-center w-[100px] flex flex-col'>
                            <button onClick={() => handleProductClick(data[key].id)}>Detail</button>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className='dark:bg-gray-800 -scroll-mb-12 pb-20'>
            <ul className='flex justify-center'>
                <li>
                    <h1 className="text-2xl font-bold mb-4 dark:text-white">Danh sách sản phẩm</h1>
                </li>
            </ul>
            <div className='container'>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
                    {renderProduct()}
                </div>
                {/* Nút phân trang */}
                <div className="flex justify-center mt-6 space-x-2">
                    {/* Nút Trang Trước */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Trang Trước
                    </button>

                    {/* Nút số trang */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${currentPage === index + 1
                                ? "bg-primary text-white"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Nút Trang Sau */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50"
                    >
                        Trang Sau
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct