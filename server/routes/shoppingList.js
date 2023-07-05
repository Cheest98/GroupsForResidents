import express from 'express';
import { getShoppingLists,
     updateShoppingList, 
     deleteShoppingList, 
     completeList, 
     addItemToList, 
     removeItemFromList, 
     getCompletedShoppingLists } from '../controllers/shoppingList.js';

const router = express.Router();

router.get('/group/:groupId', getShoppingLists);
router.patch('/:listId', updateShoppingList); 
router.delete('/:listId', deleteShoppingList); 
router.patch('/:listId/complete', completeList);
router.post('/:listId/items', addItemToList);
router.delete('/:listId/items/:itemId', removeItemFromList);
router.get('/group/:groupId/completed', getCompletedShoppingLists); 

export default router;