import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import { Typography, TextField } from '@mui/material';
import WidgetWrapper from '../WidgetWrapper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const FilterCompletedLists = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [filteredLists, setFilteredLists] = useState([]);

    const shoppingLists = useSelector((state) => state.shoppingLists);

    useEffect(() => {
        if (startDate && endDate) {
            const startDateMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const endDateMidnight = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);

            const lists = shoppingLists.filter((list) => {
                const listDate = new Date(list.completedAt);
                return list.completed && listDate >= startDateMidnight && listDate <= endDateMidnight;
            });

            setFilteredLists(lists);

            const price = lists.reduce((total, list) => total + list.totalPrice, 0);
            setTotalPrice(price);
        }
    }, [startDate, endDate, shoppingLists]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <WidgetWrapper>
                <Box>
                    <Typography variant="h6">Filter by date range:</Typography>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography variant="h6">Total Price: {totalPrice}</Typography>
                    {/* Render the filtered lists */}
                    {filteredLists.map((list) => (
                        <Box key={list._id}>
                            <h1>{list.name}</h1>
                            <h2>Total Price: {list.totalPrice}</h2>
                            <p>Completed at: {new Date(list.completedAt).toLocaleString()}</p>
                        </Box>
                    ))}
                </Box>
            </WidgetWrapper>
        </LocalizationProvider>
    );
};

export default FilterCompletedLists;