import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png";
import Search from './Search'
import Menu from './Menu'
import DarkButton from './DarkButton';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

export default function Header() {
    return (
        <header>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg">
                        <div className="header-container">
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="" />
                                </Link>
                            </div>
                            <Menu />
                        </div>
                    </div>
                    <div className="col-lg-auto">
                        <div className="header-right-buttons">
                            <Search />
                            <DarkButton />
                            <CartButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
