import express from 'express';
import { getShoppingLists, createShoppingList, updateShoppingList, deleteShoppingList, completeItem, completeList } from '../controllers/shoppingList.js';

const router = express.Router();

router.get('/:groupId', getShoppingLists);
router.post('/', createShoppingList);
router.patch('/:listId', updateShoppingList);
router.delete('/:listId', deleteShoppingList);
router.patch('/:listId/items/:itemId', completeItem);
router.patch('/:listId/complete', completeList);

export default router;