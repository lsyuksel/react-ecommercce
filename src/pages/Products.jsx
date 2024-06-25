import React, { useEffect } from 'react'

import CategoryProducts from "../components/CategoryProducts";
import CategoryFilter from '../components/CategoryFilter';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllCategoryProduct } from '../redux/slices/productsSlice';

export default function Products() {
    const { category } = useParams();

    return (
        <section className='category-page-container'>
            <div className="container">
                <h1 className='text-center' style={{ textTransform: 'uppercase' }}>{category ? category : "Ürünlerimiz"}</h1>
                <CategoryFilter />
                <div className="row gy-3">
                    <CategoryProducts categoryName={category} />
                </div>
            </div>
        </section>
    )
}
