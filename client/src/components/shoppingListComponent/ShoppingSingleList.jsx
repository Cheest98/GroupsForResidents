import React from 'react';
import WidgetWrapper from '../WidgetWrapper';
import CompletedList from './CompletedList';
import ToBuyList from './ToBuyList';

const ShoppingSingleList = ({ list, handleDelete, completeShoppingList, addItemToList, removeItemFromList }) => {


    const handleComplete = (listId, price) => {
        completeShoppingList(listId, price);
    }

    return (
        <WidgetWrapper>
            {!list.completed ? (
                <ToBuyList list={list} handleDelete={handleDelete} handleComplete={handleComplete} addItemToList={addItemToList} removeItemFromList={removeItemFromList} />
            ) : (
                <CompletedList list={list} handleDelete={handleDelete} />
            )}
        </WidgetWrapper>
    )
}

export default ShoppingSingleList;