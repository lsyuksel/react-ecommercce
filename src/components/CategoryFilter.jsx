import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { getAllCategories, getAllCategoryProduct } from '../redux/slices/productsSlice';
import { useDispatch, useSelector } from 'react-redux';

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.title,
});

export default function CategoryFilter() {
    const [categoryName, setCategoryName] = useState();
    const [categorySort, setCategorySort] = useState();

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.products.categories);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllCategoryProduct({ categoryName, categorySort }));
        };
        fetchData();
    }, [categoryName, categorySort])

    return (
        <div className='row py-4'>
            <div className='col-md-3'>
                <Autocomplete
                    options={categories}
                    getOptionLabel={(option) => option}
                    filterOptions={filterOptions}
                    onChange={(e) => setCategoryName(e.target.innerText)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Kategori" />}
                />
            </div>
            <div className='col-md-3'>
                <Autocomplete
                    options={sort}
                    getOptionLabel={(option) => option.title}
                    filterOptions={filterOptions}
                    onChange={(e, newValue) => setCategorySort(newValue.value)}
                    sx={{ width: '100%' }}
                    renderInput={(params) => <TextField {...params} label="Sıralama" />}
                />
            </div>
        </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const sort = [
    { title: 'A-Z', value: 'asc' },
    { title: 'Z-A', value: 'desc' },
];