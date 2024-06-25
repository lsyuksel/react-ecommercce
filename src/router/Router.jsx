import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Blog from '../pages/Blog'
import Faq from '../pages/Faq'
import Contact from '../pages/Contact'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import NotFound from '../pages/NotFound'

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/products/detail/:id" element={<ProductDetail />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </>
    )
}
