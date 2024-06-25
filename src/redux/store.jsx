import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import productsReducer from './slices/productsSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        products: productsReducer,
    },
})