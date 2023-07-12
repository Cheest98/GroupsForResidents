import { Cancel } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, useTheme } from '@mui/material';
import Modal from '@mui/material/Modal';
import { GlobalStyles } from '@mui/system';
import React, { useState } from 'react';
import ModalWrapper from "../ModalWrapper";

export const ToBuyList = ({ list, handleDelete, handleComplete, addItemToList, removeItemFromList }) => {

    const [price, setPrice] = useState(list.totalPrice); // Add state for price
    const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
    const [addingItem, setAddingitem] = useState(false);
    const { palette } = useTheme();
    const [completeList, setCompleteList] = useState(null);

    const handleCompleteClick = () => {
        setCompleteList(true);
    };
    const handleCancelCompleteClick = () => {
        setCompleteList(null);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleItemChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    };

    const handleCancelClick = () => {
        setAddingitem(false);
    };

    const handleAddClick = () => {
        setAddingitem(true);
    };

    const handleAddItem = () => {
        addItemToList(list._id, newItem);

        setNewItem({ name: '', quantity: 0 }); // Reset the item input fields
    };
    return (
        <>
            <GlobalStyles styles={{
                '*::-webkit-scrollbar': {
                    width: '4px',
                },
                '*::-webkit-scrollbar-track': {
                    background: palette.background.alt,
                },
                '*::-webkit-scrollbar-thumb': {
                    background: palette.neutral.light,
                },
            }} />
            <Box>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box flex={1}></Box>
                        <Box flex={2}><h1 style={{ textAlign: 'center' }}>{list.name}</h1></Box>
                        <Box flex={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => handleDelete(list._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <List sx={{ minHeight: '12rem', maxHeight: '12rem', overflowY: 'auto' }}>
                        {list.items.map((item, index) =>
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>{item.name[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                                <IconButton edge="end" onClick={() => removeItemFromList(list._id, item._id)}>
                                    <CancelIcon />
                                </IconButton>
                            </ListItem>
                        )}
                    </List>
                    {
                        addingItem
                            ? (
                                <Box >
                                    <Box padding='1rem' display="flex" justifyContent="space-around">
                                        <TextField
                                            label="Item Name"
                                            variant="outlined"
                                            name="name"
                                            value={newItem.name}
                                            onChange={handleItemChange}
                                            style={{ width: "40%" }}
                                        />
                                        <TextField
                                            label="Quantity"
                                            variant="outlined"
                                            name="quantity"
                                            type="number"
                                            value={newItem.quantity}
                                            onChange={handleItemChange}
                                            style={{
                                                width: "40%"

                                            }}
                                        />
                                    </Box>
                                    <Button variant="outlined" color="primary" disabled={!newItem.name || !newItem.quantity} onClick={handleAddItem}>Add Item</Button>
                                    <IconButton edge="end" onClick={handleCancelClick} >
                                        <CancelIcon />
                                    </IconButton>
                                </Box>
                            )
                            : (
                                <Box display="flex" justifyContent="space-around">
                                    <Box>
                                        <Button variant="outlined" color="primary" onClick={handleAddClick}>Add Item</Button>
                                    </Box>
                                    <Box>
                                        <Box>
                                            <Button variant="outlined" color="success" onClick={handleCompleteClick}>Complete</Button> </Box>
                                        <Modal open={completeList != null} onClose={handleCancelCompleteClick}>
                                            <ModalWrapper>
                                                <Box display="flex"
                                                    flexDirection="column"
                                                    gap="15px"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    sx={{ width: '100%' }}>
                                                    <TextField
                                                        label="Total Price"
                                                        variant="outlined"
                                                        value={price}
                                                        onChange={handlePriceChange}
                                                        fullWidth
                                                    />
                                                </Box>
                                                <Box display="flex" justifyContent="center">
                                                    <Button variant="outlined" color="success" onClick={() => handleComplete(list._id, price)}>Complete</Button>
                                                </Box>
                                            </ModalWrapper>
                                        </Modal>
                                    </Box>
                                </Box>
                            )
                    }
                </Box>

            </Box>
        </>
    )
}

export default ToBuyList;


