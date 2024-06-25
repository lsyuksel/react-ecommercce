import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../redux/slices/productsSlice';

export default function Menu() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    const categories = useSelector((state) => state.products.categories);
    return (
        <div className='menu'>
            <nav>
                <ul>
                    <li><Link to="/">Anasayfa</Link></li>
                    {/* <li><Link to="/about">Hakkımızda</Link></li> */}
                    <li><Link to="/products">Tüm Ürünler</Link></li>
                    {/* <li><Link to="/blog">Blog</Link></li> */}
                    {/* <li><Link to="/faq">S.S.S</Link></li> */}
                    {/* <li><Link to="/contact">İletişim</Link></li> */}
                    {
                        categories.map((categori) => (
                            <li key={categori}>
                                <Link to={`/products/${categori}`}>
                                    {categori}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}
