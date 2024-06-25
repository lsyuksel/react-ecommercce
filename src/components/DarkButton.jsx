import React, { useEffect, useState } from 'react'

import { MdLightMode } from "react-icons/md";
import { BsMoonStars } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { themeChange, setTheme } from '../redux/slices/themeSlice';

export default function DarkButton() {

    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);

    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem('isDark'));
        if (savedTheme !== null) {
            dispatch(setTheme(savedTheme));
        }
    }, [dispatch]);

    useEffect(() => {
        if (isDark) {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    }, [isDark]);

    return (
        <>
            <div className="theme-button" onClick={() => dispatch(themeChange())}>
                {
                    isDark ? <MdLightMode /> : <BsMoonStars />
                }
            </div>
        </>
    )
}
