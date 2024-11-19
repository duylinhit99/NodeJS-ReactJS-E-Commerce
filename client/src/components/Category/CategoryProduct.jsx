import React, { useEffect, useState } from 'react'
import api from '../../api'
import AddCart from '../Cart/AddCart';
import { toast } from 'react-toastify';
import { FaStar } from "react-icons/fa6";
import { useParams } from 'react-router-dom'
const CategoryProduct = () => {
    let param = useParams();
    let id = param.id
    console.log(id);

    const [data, setData] = useState({})
    useEffect(() => {
        api.get(`category/${id}/products`).then(res => {
            console.log(res);
            setData(res.data)
        }).catch(error => console.log(error))
    }, [])

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
                <li>A</li>
                <li>B</li>
                <li>C</li>
            </ul>
            <div className='container'>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
                    {renderProduct()}
                </div>
            </div>
        </div>
    )
}

export default CategoryProduct