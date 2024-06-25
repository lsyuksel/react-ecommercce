import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCart, addFavorite, getAllProduct, removeFavorite } from '../redux/slices/productsSlice';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';

import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Product({ product, loading }) {
    const dispatch = useDispatch();

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
    const productList = useSelector((state) => state.products.productList);

    const addItemToBasket = (productId) => {
        const arrayItem = productList.filter((item) => item.id === productId);
        const selectedProduct = arrayItem[0];
        dispatch(addCart({ product: selectedProduct, amount: 1 }));
        toast.success("Sepete Eklendi");
    };
    return (
        <>
            {
                loading ? (
                    <div className='product-item'>
                        <div className="product-image">
                            <div>
                                <Skeleton animation="wave" height={'100%'} style={{ transform: 'initial' }} />
                            </div>
                        </div>
                        <div className="product-content">
                            <div className="product-title">
                                <Skeleton animation="wave" height={20} />
                            </div>
                            <div className="product-price">
                                <Skeleton animation="wave" height={20} width={'30%'} />
                            </div>
                            <Skeleton animation="wave" height={50} />
                        </div>
                    </div>
                ) : (
                    <div className='product-item'>
                        <div className="favorite-button">
                            {
                                isFavorited ? (
                                    <div onClick={addFavoriteProduct} className='active'><FavoriteIcon /></div>
                                ) : (
                                    <div onClick={addFavoriteProduct} className=''><FavoriteIcon /></div>
                                )
                            }
                        </div>
                        <div className="product-image">
                            <img src={product.image} />
                        </div>
                        <div className="product-content">
                            <div className="product-title">
                                <Link to={`/products/detail/${product.id}`}>
                                    <h2>{product.title}</h2>
                                </Link>
                            </div>
                            <div className="product-price">
                                ${product.price}
                            </div>
                            <div className="product-button">
                                <a onClick={() => { addItemToBasket(product.id) }}>Sepete Ekle</a>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
