import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingLists } from "../../../state/index";
import ShoppingList from "../../../components/shoppingListComponent/shoppingList"

const ShoppingListWidget = ({ getGroupShoppingList }) => {
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => state.shoppingLists);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);


    const deleteShoppingList = async (listId) => {
        const response = await fetch(`http://localhost:3001/lists/${listId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            const updatedShoppingLists = shoppingLists.filter((list) => list._id !== listId);
            dispatch(setShoppingLists({ shoppingLists: updatedShoppingLists }));
        }
    };
    useEffect(() => {
        getGroupShoppingList();
    }, [getGroupShoppingList]);



    return (
        <ShoppingList shoppingLists={shoppingLists} deleteShoppingList={deleteShoppingList} />
    );
};

export default ShoppingListWidget;
