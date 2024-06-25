import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllCategoryProduct, setSearch } from '../redux/slices/productsSlice';
import Product from './Product';

export default function CategoryProducts({ categoryName }) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const search = useSelector((state) => state.products.search);
    const filteredCategoryProducts = useSelector((state) => state.products.filteredCategoryProducts);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (categoryName && categoryName.length > 0) {
                dispatch(setSearch(""))
            }
            await dispatch(getAllCategoryProduct({ categoryName }));
            setLoading(false);
        };
        fetchData();
    }, [categoryName])

    const categoryProducts = useSelector((state) => state.products.categoryProducts);
    return (
        <>
            {
                search && search.length > 0 ?
                    (
                        filteredCategoryProducts.length > 0 ?
                            (
                                filteredCategoryProducts.map((product) => (
                                    <div key={product.id} className="col-lg-3">
                                        <Product product={product} loading={loading} />
                                    </div>
                                ))
                            ) : (
                                <h1>Sonuç bulunamadı...</h1>
                            )
                    )
                    :
                    (
                        categoryProducts.map((product) => (
                            <div key={product.id} className="col-lg-3">
                                <Product product={product} loading={loading} />
                            </div>
                        ))
                    )
            }
        </>
    )
}

