import React from 'react';
import CompletedList from './CompletedList';
import ToBuyList from './ToBuyList';

const ShoppingSingleList = ({ list, deleteShoppingList, completeShoppingList, addItemToList, removeItemFromList }) => {


    const handleDelete = (listId) => {
        deleteShoppingList(listId);
    }
    const handleComplete = (listId, price) => {
        completeShoppingList(listId, price);
    }

    return (
        !list.completed ? (
            <ToBuyList list={list} handleDelete={handleDelete} handleComplete={handleComplete} addItemToList={addItemToList} removeItemFromList={removeItemFromList} />
        ) : (
            <CompletedList list={list} handleDelete={handleDelete} />  // Pass list as a prop to your CompletedList component
        )
    )
}

export default ShoppingSingleList;