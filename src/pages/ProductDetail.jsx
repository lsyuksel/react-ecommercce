import React, { Component, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { addCart, addFavorite, getAllProduct, getProduct, removeFavorite } from '../redux/slices/productsSlice';

import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import ProductTab from '../components/ProductTab';

import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';

export default function ProductDetail() {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const product = useSelector((state) => state.products.productDetail);
    const { title, price, description, category, image } = product;

    const [productAmount, setProductAmount] = useState(1);
    const favoritedProduct = useSelector((state) => state.products.favoritedProduct);
    const isFavorited = favoritedProduct.some((item) => item.id === product.id);

    const addFavoriteProduct = () => {
        if (isFavorited) {
            dispatch(removeFavorite(product))
            toast.warn("Favorilerinden Çıkarıldı");
        } else {
            dispatch(addFavorite(product));
            toast.success("Favorilerine Eklendi");
        }
    }

    const addToCart = () => {
        dispatch(addCart({ product, amount: productAmount }));
        toast.success("Sepete Eklendi");
    }

    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getProduct(id));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, id]);

    return (
        <section className='product-detail-container'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5">
                        <div className="product-detail-image">
                            {
                                loading ? (
                                    <div className='lazy-image'>
                                        <Skeleton animation="wave" height={'100%'} width={'100%'} style={{ transform: 'initial' }} />
                                    </div>
                                ) : (
                                    <ReactFancyBox thumbnail={image} image={image} />
                                )
                            }
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div className="product-detail-content">
                            <Link style={{ textDecoration: "none" }} className='product-category' to={`/products/${category}`}>
                                {category}
                            </Link>
                            <div className='product-title'>
                                <h1>{title}</h1>
                            </div>
                            <div className='product-description'>{description}</div>
                            <div className="product-price">
                                ${price}
                            </div>
                            <div className="product-qty">
                                <div onClick={() => {
                                    productAmount > 1 && setProductAmount(productAmount - 1)
                                }}><RemoveIcon /></div>
                                <input type='number' value={productAmount} onChange={(e) => setProductAmount(event.target.value)} min={1} />
                                <div onClick={() => setProductAmount(productAmount + 1)}><AddIcon /></div>
                            </div>
                            <div className="product-buttons">
                                {
                                    isFavorited ?
                                        <Button onClick={addFavoriteProduct} className='primary active' startIcon={<FavoriteIcon />}>Favorilerden Kaldır</Button>
                                        :
                                        <Button onClick={addFavoriteProduct} className='primary' startIcon={<FavoriteIcon />}>Favorilere Ekle</Button>

                                }
                                <Button onClick={addToCart} className='secondary' startIcon={<ShoppingCartIcon />}>
                                    Sepete Ekle
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <ProductTab
                            categoryName={category}
                            prdocutDetail={description}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
