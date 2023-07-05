import React, { useState } from 'react'
import TaskWrapper from '../tasksComponents/TaskWrapper';
import { Button, TextField, Box, Divider, List, ListItem, Typography } from '@mui/material';
import { AddCircle, Cancel } from "@mui/icons-material"
import { green } from '@mui/material/colors';


export const ToBuyList = ({ list, handleDelete, handleComplete, addItemToList, removeItemFromList }) => {

    const [price, setPrice] = useState(list.totalPrice); // Add state for price
    const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
    const [addingItem, setAddingitem] = useState(false);



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
        <TaskWrapper>
            <Box>
                <h1>{list.name}</h1>
                <List>
                    {list.items.map((item, index) => (
                        <ListItem key={index}>
                            <Typography variant="body1">
                                {item.name} - {item.quantity}
                            </Typography>
                            <Cancel variant="outlined" color="error" onClick={() => removeItemFromList(list._id, item._id)} />
                        </ListItem>
                    ))}
                </List>
                {
                    addingItem
                        ? (
                            <Box>
                                <TextField
                                    label="Item Name"
                                    variant="outlined"
                                    name="name"
                                    value={newItem.name}
                                    onChange={handleItemChange}
                                />
                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    name="quantity"
                                    type="number"
                                    value={newItem.quantity}
                                    onChange={handleItemChange}
                                />
                                <Button variant="outlined" color="primary" disabled={!newItem.name || !newItem.quantity} onClick={handleAddItem}>Add Item</Button>
                                < Cancel onClick={handleCancelClick} sx={{
                                    fontSize: "25px", "&:hover": {
                                        cursor: "pointer",
                                    },
                                }} />
                            </Box>
                        )
                        : (

                            < AddCircle onClick={handleAddClick} sx={{
                                color: green[500],
                                "&:hover": {
                                    cursor: "pointer",
                                }
                            }} />
                        )
                }
                <Box>

                    <Divider /><Box><TextField
                        label="Total Price"
                        variant="outlined"
                        value={price}
                        onChange={handlePriceChange}
                    />           <Button variant="outlined" color="error" onClick={() => handleDelete(list._id)}>Delete</Button>
                        <Button variant="outlined" color="success" onClick={() => handleComplete(list._id, price)}>Complete</Button> </Box>
                </Box>
            </Box>

        </TaskWrapper >
    )
}

export default ToBuyList;


