import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
// import api from '../../api';

const SearchProduct = () => {

    return (
        <div className='relative group hidden sm:block'>
            <input type="text"
                placeholder='search'
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300
                                            rounded-full border border-gray-300 px-2 py-1
                                            focus:outline-none focus:border-1 
                                            focus:border-primary
                                            dark:border-gray-500
                                            dark:bg-gray-800
                                "

            />
            <BsSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
        </div>
    )
}

export default SearchProduct