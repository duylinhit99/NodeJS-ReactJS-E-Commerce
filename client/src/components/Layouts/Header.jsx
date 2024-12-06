import Logo from '../../assets/logo.png'
import { FaCartShopping } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import DarkMore from './DarkMore'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../api'
import SearchProduct from '../Products/SearchProduct';
const Header = () => {
    const [category, setCategory] = useState({})
    useEffect(() => {
        api.get('/category').then(res => {
            setCategory(res.data.categories)
        }).catch(error => console.log(error)
        )
    }, [])
    // console.log(category[0]);
    const renderData = () => {
        if (Object.keys(category).length > 0) {
            return Object.keys(category).map((key, index) => {
                return (
                    <li key={key}>
                        <Link to={`category/${category[key].id}/products`} className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                            {category[key].name}
                        </Link>
                    </li>
                )
            })
        }
    }

    const checkLogin = JSON.parse(localStorage.getItem('login'))
    const navigate = useNavigate()
    const handleCheckLogin = () => {
        if (checkLogin) {
            return (
                <Link className='bg-primary rounded-full w-[70px] text-center' to="/login" onClick={handleLogout}>Logout</Link>
            )
        } else {
            return (
                <Link className='bg-primary rounded-full w-[70px] text-center' to="/login">Login</Link>
            )
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("login")
        navigate('/login')
    }

    const hanldeCart = () => {
        navigate('/cart')
    }
    return (
        <>
            <header>
                <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white 
                                duration-200 relative z-40
                ">
                    {/* up navbar */}
                    <div className="bg-primary/40 py-2">
                        <div className="container flex justify-between items-center">
                            {/* logo */}
                            <div>
                                <a href="/" className='font-bold text-2xl sm:text-3xl
                                                        flex gap-2 '>
                                    <img src={Logo} alt="" className='w-10' />
                                    Shopsy
                                </a>
                            </div>
                            {/* search */}
                            <div className='flex justify-center items-center gap-4'>
                                <SearchProduct />
                                {handleCheckLogin()}
                                {/* order */}
                                <button
                                    onClick={() => hanldeCart()}
                                    className="bg-gradient-to-r from-primary to-secondary transition-all duration-200
                                    text-white py-1 px-4 rounded-full flex items-center gap-3 group">
                                    <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer' />
                                </button>
                                {/* Dark More */}
                                <div>
                                    <DarkMore />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* lower Navbar */}
                    <div>
                        <ul className='sm:flex hidden items-center gap-4 justify-center'>
                            <li>
                                <Link to="/" className='inline-block px-4 hover:text-primary duration-200'>Home</Link>
                            </li>
                            <li>
                                <a href="" className='inline-block px-4 hover:text-primary duration-200'>Blog</a>
                            </li>
                            <li className='group relative cursor-pointer'>
                                <a href="#" className='flex items-center gap-[2px] py-2'>
                                    Category
                                    <span>
                                        <IoMdArrowDropdown
                                            className='transition-all duration-200 group-hover:rotate-180'
                                        />
                                    </span>
                                </a>
                                <div className='absolute z-[9999] hidden
                                        group-hover:block w-[150px] rounded-md bg-white p-2 text-black
                                        shadow-md'>
                                    <ul>
                                        {renderData()}
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a href="" className='inline-block px-4 hover:text-primary duration-200'>Electronics</a>
                            </li>
                            {/* simple Dropdown and Link */}
                            <li className='group relative cursor-pointer'>
                                <a href="#" className='flex items-center gap-[2px] py-2'>
                                    Trending Products
                                    <span>
                                        <IoMdArrowDropdown
                                            className='transition-all duration-200 group-hover:rotate-180'
                                        />
                                    </span>
                                </a>
                                <div className='absolute z-[9999] hidden
                                        group-hover:block w-[150px] rounded-md bg-white p-2 text-black
                                        shadow-md'>
                                    <ul>
                                        <li>
                                            <a href="" className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                Best Selling
                                            </a>
                                        </li>
                                        <li>
                                            <a href="" className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>
                                                Top Rated
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;