import { Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ShoppingStatus from '../ShoppingStatus';
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

    const [displayedListsCount, setDisplayedListsCount] = useState(6);

    const handleLoadMore = () => {
        setDisplayedListsCount(prevCount => prevCount + 6);
    }

    useEffect(() => {
        if (startDate && endDate && shoppingLists.length > 0) {
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
            <Box>
                <ShoppingStatus mb="0.5rem" mt="0.5rem">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box flex={2}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box flex={2}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                        <Box flex={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6">Total Price</Typography>
                            <Typography variant="h6">{totalPrice}</Typography>
                        </Box>
                    </Box>
                </ShoppingStatus>
                <Grid container spacing={3}>
                    {filteredLists.slice(0, displayedListsCount).map((list) => (
                        <Grid item xs={12} sm={6} key={list._id}>
                            <WidgetWrapper>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box flex={1}>
                                        <h1 style={{ textAlign: 'center' }}>{list.name}</h1>
                                    </Box>
                                    <Box flex={1} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Typography variant="body2">Completed at:</Typography>
                                        <Typography variant="body2">{new Date(list.completedAt).toLocaleString()}</Typography>
                                    </Box>
                                </Box>
                                <List sx={{ minHeight: '12rem', maxHeight: '12rem', overflowY: 'auto' }}>
                                    {list.items.map((item, index) => (
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>{item.name[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                                        </ListItem>
                                    ))}
                                </List>
                                <h2>Total Price: {list.totalPrice}</h2>
                                <Button variant="outlined" color="error" onClick={() => handleDelete(list._id)}>Delete</Button>
                            </WidgetWrapper>
                        </Grid>
                    ))}
                </Grid>
                {displayedListsCount < filteredLists.length && (
                    <Button onClick={handleLoadMore}>More Lists</Button>
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default FilterCompletedLists;