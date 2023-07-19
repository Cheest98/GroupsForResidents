import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingList from "../../../components/shoppingListComponent/ShoppingList";
import { setShoppingLists } from "../../../state/index";

const ShoppingListWidget = ({ getGroupShoppingList }) => {
    const dispatch = useDispatch();
    const shoppingLists = useSelector((state) => Array.isArray(state.shoppingLists) ? state.shoppingLists : []);
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

    const completeShoppingList = async (listId, totalPrice) => {
        const response = await fetch(`http://localhost:3001/lists/${listId}/complete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ completed: true, totalPrice: totalPrice })
        });
        if (response.ok) {
            const updatedList = await response.json();
            const updatedShoppingLists = shoppingLists.map((list) =>
                list._id === updatedList._id ? updatedList : list
            );
            dispatch(setShoppingLists({ shoppingLists: updatedShoppingLists }));
        }
    };

    const addItemToList = async (listId, item) => {
        const response = await fetch(`http://localhost:3001/lists/${listId}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
        });

        if (response.ok) {
            const updatedList = await response.json();
            const updatedShoppingLists = shoppingLists.map((list) =>
                list._id === updatedList._id ? updatedList : list
            );

            dispatch(setShoppingLists({ shoppingLists: updatedShoppingLists }));
        }
    };

    const removeItemFromList = async (listId, itemId) => {
        const response = await fetch(`http://localhost:3001/lists/${listId}/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const updatedList = await response.json();
            const updatedShoppingLists = shoppingLists.map((list) =>
                list._id === updatedList._id ? updatedList : list
            );

            dispatch(setShoppingLists({ shoppingLists: updatedShoppingLists }));
        }
    };

    useEffect(() => {
        getGroupShoppingList();
    }, [getGroupShoppingList]);

    return (
        <ShoppingList
            shoppingLists={shoppingLists}
            deleteShoppingList={deleteShoppingList}
            completeShoppingList={completeShoppingList}
            addItemToList={addItemToList}
            removeItemFromList={removeItemFromList} />
    );
};

export default ShoppingListWidget;
