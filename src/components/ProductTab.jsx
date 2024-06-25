import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CategoryProducts from "./CategoryProducts";
import FavoritedProducts from "./FavoritedProducts";

export default function ProductTab({ prdocutDetail, categoryName }) {

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Ürün Açıklaması" value="1" />
                        <Tab label="Benzer Ürünler" value="2" />
                        <Tab label="Favori Ürünler" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {prdocutDetail}
                </TabPanel>
                <TabPanel value="2">
                    <div className="row gy-4">
                        <CategoryProducts categoryName={categoryName} />
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className="row gy-4">
                        <FavoritedProducts />
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
