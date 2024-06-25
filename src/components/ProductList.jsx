import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAllProduct } from "../redux/slices/productsSlice";
import Product from './Product';

export default function ProductList({ sectionTitle }) {
    const [loading, setLoading] = useState(true);

    var sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getAllProduct());
            setLoading(false);
        };
        fetchData();
    }, []);

    const productList = useSelector((state) => state.products.productList);

    return (
        <section className='product-list-container'>
            <div className="container">
                {sectionTitle && <div className="section-title">{sectionTitle}</div>}
                {
                    <Slider {...sliderSettings}>
                        {
                            productList && productList.map((product) => (
                                <Product key={product.id} product={product} loading={loading} />
                            ))
                        }
                    </Slider>
                }
            </div>
        </section>
    )
}
