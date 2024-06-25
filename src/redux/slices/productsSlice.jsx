import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
export const getAllCategories = createAsyncThunk('categories', async () => {
    const response = await axios.get("https://fakestoreapi.com/products/categories");
    return response.data
},)

export const getAllProduct = createAsyncThunk('products', async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data
},)
export const getProduct = createAsyncThunk('product', async (productId) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    return response.data
},)

export const getAllCategoryProduct = createAsyncThunk('category-products', async ({ categoryName, categorySort }) => {
    let url;
    if (categoryName) {
        url = `https://fakestoreapi.com/products/category/${categoryName}`;
        if (categorySort) {
            url += `?sort=${categorySort}`;
        }
    } else {
        url = 'https://fakestoreapi.com/products';
        if (categorySort) {
            url += `?sort=${categorySort}`;
        }
    }

    const response = await axios.get(url);
    return response.data;
},)

const initialState = {
    search: "",
    categories: [],
    productList: [],
    productDetail: [],
    categoryProducts: [],
    filteredCategoryProducts: [],
    basket: JSON.parse(localStorage.getItem('basketList')) || [],
    favoritedProduct: JSON.parse(localStorage.getItem('favoritedList')) || [],
}

// Then, handle actions in your reducers:
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favoritedProduct.push(action.payload);
            localStorage.setItem('favoritedList', JSON.stringify(state.favoritedProduct));
        },
        removeFavorite: (state, action) => {
            state.favoritedProduct = state.favoritedProduct.filter((item) => item.id != action.payload.id);
            localStorage.setItem('favoritedList', JSON.stringify(state.favoritedProduct));
        },
        addCart: (state, action) => {
            const { product, amount } = action.payload;
            for (let i = 0; i < amount; i++) {
                state.basket.push(product);
            }
            localStorage.setItem('basketList', JSON.stringify(state.basket));
        },
        updateCart: (state, action) => {
            state.basket = action.payload;
            localStorage.setItem('basketList', JSON.stringify(state.basket));
        },
        filteredProducts: (state, action) => {
            state.filteredCategoryProducts = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.productList = action.payload
        })
        builder.addCase(getAllCategoryProduct.fulfilled, (state, action) => {
            state.categoryProducts = action.payload
        })
        // lazy yaparsan buna gerek kalmaz sayfa ilk açıldıgında apiye istek atarken eski ürünü gösteriyor,
        builder.addCase(getProduct.pending, (state, action) => {
            state.productDetail = []
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.productDetail = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { addCart, updateCart, addFavorite, removeFavorite, filteredProducts, setSearch } = productsSlice.actions;

export default productsSlice.reducer