import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../scenes/navbar";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingLists } from '../../state';

const ShoppingListPage = () => {
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingLists);

    useEffect(() => {
        //test
        setTimeout(() => {
            const data = [
                // custom data
                { _id: 1, name: 'Test1', items: ['item1', 'item2 '], totalPrice: 5 },
                { _id: 2, name: 'TEsst2', items: ['item3', 'item4'], totalPrice: 1000 }
            ];
            dispatch(setShoppingLists({ shoppingLists: data }));
        }, 1000);
    }, [dispatch]);

    return (
        <Box>
            <Navbar />
            <Box>
                <h1>Shopping Lists</h1>
                {shoppingLists.map(list => (
                    <div key={list._id}>
                        <h2>{list.name}</h2>
                        <ul>
                            {list.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <h3>Total Price: {list.totalPrice}</h3>
                    </div>
                ))}
            </Box>
            ShoppingList
        </Box>
    );
};

export default ShoppingListPage;