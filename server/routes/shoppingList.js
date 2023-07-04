import express from 'express';
import { getShoppingLists, updateShoppingList, deleteShoppingList, completeList, addItemToList } from '../controllers/shoppingList.js';

const router = express.Router();

router.get('/group/:groupId', getShoppingLists); // GET endpoint for getting shopping lists// POST endpoint for creating new list
router.patch('/:listId', updateShoppingList); // PATCH endpoint for updating existing list
router.delete('/:listId', deleteShoppingList); // DELETE endpoint for deleting a list
router.patch('/:listId/complete', completeList);; // PATCH endpoint for marking a list as completed
router.post('/:listId/items', addItemToList)

export default router;