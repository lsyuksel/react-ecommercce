import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDark: JSON.parse(localStorage.getItem('isDark')) || false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeChange: (state) => {
            state.isDark = !state.isDark;
            localStorage.setItem('isDark', JSON.stringify(state.isDark));
        },
        setTheme: (state, action) => {
            state.isDark = action.payload;
            localStorage.setItem('isDark', JSON.stringify(state.isDark));
        },
    },
})

// Action creators are generated for each case reducer function
export const { themeChange, setTheme } = themeSlice.actions;

export default themeSlice.reducer