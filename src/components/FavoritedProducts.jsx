import React from 'react'
import Product from './Product';
import { useSelector } from 'react-redux';

export default function FavoritedProducts() {
    const favoritedProduct = useSelector((state) => state.products.favoritedProduct);
    return (
        <>
            {
                favoritedProduct && favoritedProduct.map((product) => (
                    <div key={product.id} className="col-lg-3">
                        <Product product={product} />
                    </div>
                ))
            }
        </>
    )
}
