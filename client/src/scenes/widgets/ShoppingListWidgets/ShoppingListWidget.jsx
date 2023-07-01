import { Box, } from "@mui/material";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ShoppingListWidget = ({ getGroupShoppingList }) => {
    const shoppingLists = useSelector((state) => state.shoppingLists);


    useEffect(() => {
        getGroupShoppingList();
    }, [getGroupShoppingList]);



    return (
        <Box>
            <Box>
                <h1>Shopping Listss</h1>
                {
                    Array.isArray(shoppingLists) ? shoppingLists.map(list => (
                        <div key={list._id}>
                            <h2>{list.name}</h2>
                            <ul>
                                {list.items.map((item, index) => (
                                    <li key={index}>{item.name} - Quantity: {item.quantity}</li>
                                ))}
                            </ul>
                            <h3>Total Price: {list.totalPrice}</h3>
                        </div>
                    )) : <p>No Shopping Lists Found</p>
                }
            </Box>
            ShoppingList
        </Box>
    );
};

export default ShoppingListWidget;