import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WidgetWrapper from '../WidgetWrapper';

export const FilterCompletedLists = ({ handleDelete }) => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    const [startDate, setStartDate] = useState(oneWeekAgo);
    const [endDate, setEndDate] = useState(today);
    const [totalPrice, setTotalPrice] = useState(0);
    const shoppingLists = useSelector((state) => state.shoppingLists);

    const [filteredLists, setFilteredLists] = useState([]);

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
                            <Button variant="outlined" color="error" onClick={() => handleDelete(list._id)}>Delete</Button>
                        </Box>
                    ))}
                </Box>
            </WidgetWrapper>
        </LocalizationProvider>
    );
};

export default FilterCompletedLists;