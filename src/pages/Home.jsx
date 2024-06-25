import React from 'react'
import ProductList from '../components/ProductList'
import FavoritedProducts from '../components/FavoritedProducts'

export default function Home() {
    return (
        <>
            <ProductList sectionTitle="Ürünlerimiz" />
            <section>
                <div className="container">
                    <div className="section-title">Favori Ürünler</div>
                    <div className="row gy-4">
                        <FavoritedProducts />
                    </div>
                </div>
            </section>
        </>
    )
}
