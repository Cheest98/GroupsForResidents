import { Box, } from "@mui/material";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingLists } from '../../../state/index';

const ShoppingListWidget = () => {
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingLists);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);


    const getGroupShoppingList = async () => {
        const response = await fetch(
            `http://localhost:3001/lists//group/${user.group}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setShoppingLists({ shoppingLists: data }));
    };

    useEffect(() => {
        getGroupShoppingList();
    }, []);


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