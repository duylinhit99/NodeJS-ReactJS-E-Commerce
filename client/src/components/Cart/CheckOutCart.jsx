import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../api';
import { toast } from 'react-toastify';
const CheckOutCart = () => {
    const data = useLocation();
    const navigate = useNavigate()
    const [item, setItem] = useState([])
    const [total, setTotal] = useState(0)
    const [userData, setUserData] = useState()
    const getCookie = (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    };
    useEffect(() => {
        const token = getCookie('authToken')
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        }
        if (token) {
            api.get('/user', config).then(res => {
                console.log(res.data.user);
                setUserData(res.data.user)
            }).catch(error => {
                console.log(error);
            })
        }
    }, [])

    useEffect(() => {
        if (data.state) {
            setItem(data.state)
        }
    }, [])

    useEffect(() => {
        const totalProduct = item.reduce((total, value) => {
            const price = Number(value.price) || 0; // Chuyển đổi về số nếu có thể
            const qty = Number(value.quantity) || 0; // Chuyển đổi về số nếu có thể
            return total + (price * qty);
        }, 0);
        setTotal(totalProduct)
    }, [item])
    const handleBuy = () => {
        // const userId = userData.userId
        api.post('/cart/products/order/' + userData.userId, item).then(res => {
            if (res) {
                console.log(res);
                localStorage.removeItem("cart")
                navigate('/')
                toast.success(res.data.message)
            }
        }).catch(error => {
            console.log(error);

        })
    }
    const renderData = () => {
        if (Object.keys(item).length > 0) {
            return Object.keys(item).map((key, index) => {
                return (
                    <>
                        {/* <!-- Sản phẩm 1 --> */}
                        <tr className="border-b transition duration-300" key={key}>
                            <td className="py-2 px-6 flex items-center">
                                <img className="w-20 h-20 rounded-md mr-4 shadow" src={item[key].image} alt="Product Image" />
                                <span className="text-lg font-semibold text-gray-800 dark:text-white">{item[key].title}</span>
                            </td>
                            <td className="py-2 px-6">
                                <div className="flex items-center justify-center border-gray-300 rounded">
                                    <input type="text" className="w-12 text-center border-none outline-none text-white" disabled value={item[key].quantity} onChange={(event) => handleQuantityChange(index, event)} />
                                </div>
                            </td>
                            <td className="py-2 px-6 text-center">
                                <span className="text-lg font-semibold text-gray-800 dark:text-white" id={item[key].id}>{item[key].quantity * item[key].price}$</span>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    }
    return (
        <div className="container mx-auto dark:bg-slate-800">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Shopping Cart</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-slate-800">
                <thead className="bg-gray-200 dark:bg-slate-800">
                    <tr>
                        <th className="py-4 px-6 text-left text-lg font-semibold text-gray-700 dark:text-white">Product</th>
                        <th className="py-4 px-6 text-lg font-semibold text-gray-700 dark:text-white">Quantity</th>
                        <th className="py-4 px-6 text-lg font-semibold text-gray-700 dark:text-white">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- Sản phẩm 1 --> */}
                    {renderData()}
                </tbody>
            </table>
            {/* <!-- Tổng thanh toán --> */}
            <div className="mt-8 bg-white shadow-lg rounded-lg p-6 dark:bg-slate-800">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Order Summary</h2>

                <div className="flex justify-between border-b py-2">
                    <p className="text-lg font-semibold dark:text-white">Total:</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-white">{total + 5}$</p>
                </div>

                <div className="flex justify-end mt-4">
                    <button className="w-[200px] py-3 bg-primary text-white rounded-lg hover:scale-105 transform transition duration-300" onClick={handleBuy}>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default CheckOutCart