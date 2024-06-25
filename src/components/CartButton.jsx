import React, { Component, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { LiaTimesSolid } from "react-icons/lia";
import { BsTrash } from "react-icons/bs";
import { updateCart } from '../redux/slices/productsSlice';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const style = {
    position: 'fixed',
    top: '0',
    right: '0',
    transform: 'translate(0%, 0%)',
    width: 450,
    height: '100vh',
    bgcolor: 'background.paper',
    border: '0',
    boxShadow: 'none',
    p: 0,
    outline: 'none',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
};

export default function CartButton() {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.products.basket);

    const deleteCartItem = (id) => {
        const newArray = basket.filter((item) => item.id !== id);
        dispatch(updateCart(newArray));
        toast.warn("Sepetten Çıkarıldı");
    }

    const groupedProducts = basket.reduce((acc, product) => {
        const existingProduct = acc.find(p => p.id === product.id);
        if (existingProduct) {
            existingProduct.count += 1;
        } else {
            acc.push({ ...product, count: 1 });
        }
        return acc;
    }, []);

    const updateCartAmount = (id, amount) => {
        if (amount < 1) {
            return;
        }

        const productToUpdate = basket.find(item => item.id === id);
        if (productToUpdate) {
            const newArray = basket.filter(item => item.id !== id);
            for (let i = 0; i < amount; i++) {
                newArray.push({ ...productToUpdate });
            }
            dispatch(updateCart(newArray));
        }
    }
    groupedProducts.sort((a, b) => b.id - a.id);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const calculateTotalPrice = (basket) => {
        let totalPrice = 0;

        basket.forEach((product) => {
            const { price } = product;
            totalPrice += Number(price);
        });

        return totalPrice.toFixed(2);
    };

    const totalBasketPrice = calculateTotalPrice(basket);

    return (
        <div>
            <div onClick={handleOpen} className="cart-button">
                <BsCartPlus />
                <span className='cart-amount'>{basket.length}</span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="">
                    <div className="basket-title-container">
                        <span>Shopping Cart ({basket.length})</span>
                        <div className='close-button' onClick={handleClose}><LiaTimesSolid /></div>
                    </div>
                    <div className="basket-container">
                        {
                            groupedProducts.length > 0 ? groupedProducts.map((item) => (
                                <div key={item.id} className="basket-item">
                                    <div className="basket-image">
                                        <img src={item.image} alt="" height={100} />
                                    </div>
                                    <div className="basket-content">
                                        <div className="basket-title">
                                            <span>{item.title}</span>
                                            <div className='' onClick={() => deleteCartItem(item.id)}>
                                                <BsTrash />
                                            </div>
                                        </div>
                                        <div className="basket-price">${item.price}</div>
                                        <div className="basket-count">
                                            <div onClick={() => updateCartAmount(item.id, item.count - 1)}><RemoveIcon /></div>
                                            <input type='number' value={item.count} onChange={(e) => updateCartAmount(item.id, parseInt(e.target.value))} min={1} />
                                            <div onClick={() => updateCartAmount(item.id, item.count + 1)}><AddIcon /></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                                : (
                                    <div className='empty-basket'>
                                        <div><BsCartPlus /></div>
                                        <h3 className=''>Sepetiniz boş...</h3>
                                    </div>
                                )
                        }
                    </div>
                    <div className="basket-bottom">
                        <div>Subtotal</div>
                        <div>${totalBasketPrice}</div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
