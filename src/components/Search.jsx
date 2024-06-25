import React, { useEffect, useState } from 'react'
import { TfiSearch } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { filteredProducts, getAllCategoryProduct, setSearch } from '../redux/slices/productsSlice';


export default function Search() {
    const search = useSelector((state) => state.products.search);
    const dispatch = useDispatch();
    const { category } = useParams();
    const categoryProducts = useSelector((state) => state.products.categoryProducts);

    const searchFiltered = () => {
        if (search && search.length > 0) {
            const filteredData = categoryProducts.filter((item) => (
                item.title.toLowerCase().includes(search.toLowerCase())
            ))
            dispatch(filteredProducts(filteredData))
        }
    }

    const searchButton = (e) => {
        dispatch(setSearch(e));
    }

    useEffect(() => {
        if (!categoryProducts.length > 0) {
            dispatch(getAllCategoryProduct({}));
        }
        searchFiltered();
        console.log("categoryProducts", categoryProducts)
    }, [search])

    return (
        <>
            <div className='search-box'>
                <input type="text" value={search} onChange={(e) => searchButton(e.target.value)} placeholder='Ara..' />
                <Link to={`/products`} onClick={searchFiltered}>
                    <button><TfiSearch /></button>
                </Link>
            </div>
        </>
    )
}
