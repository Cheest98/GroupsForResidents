import ShoppingList from '../models/shoppingList.js';
import User from "../models/user.js";

export const getShoppingLists = async (req, res) => {
  try {
    const { groupId } = req.params;
    const lists = await ShoppingList.find({ group: groupId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createShoppingList = async (req, res) => {
    try {
      const { userId, name, items, totalPrice } = req.body; // Add totalPrice to the request body
      
      const user = await User.findById(userId);
    
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newList = new ShoppingList({
        user:userId,
        name,
        items,
        group: user.group,
        totalPrice // Assign the totalPrice from the request body
      });
  
      await newList.save();
  
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  };
  

  export const updateShoppingList = async (req, res) => {
    try {
      const { listId } = req.params;
      const { name, items, completed, totalPrice } = req.body; // Add totalPrice to the request body
  
      const list = await ShoppingList.findById(listId);
      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }
  
      if (name) list.name = name;
      if (items) list.items = items;
      if (completed !== undefined) list.completed = completed;
      if (totalPrice !== undefined) list.totalPrice = totalPrice; // Update the totalPrice if provided
  
      await list.save();
  
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const deleteShoppingList = async (req, res) => {
  try {
    const { listId } = req.params;

    const list = await ShoppingList.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    await ShoppingList.findByIdAndRemove(listId);

    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const completeList = async (req, res) => {
  try {
      const { listId } = req.params;
      const { totalPrice } = req.body; // Extract the totalPrice from the request body

      const list = await ShoppingList.findById(listId);
      if (!list) {
          return res.status(404).json({ message: 'List not found' });
      }

      list.items.forEach(item => {
          item.bought = true;
      });

      list.completed = true;
      list.completedAt = new Date(); // Set the completedAt timestamp

      if (totalPrice !== undefined) list.totalPrice = totalPrice; // Update the totalPrice if provided

      await list.save();

      res.json(list);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

export const getCompletedShoppingLists = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { startDate, endDate } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const lists = await ShoppingList.find({ 
      group: groupId, 
      completed: true,
      completedAt: { $gte: start, $lte: end } 
    });

    let totalCost = 0;
    lists.forEach(list => totalCost += list.totalPrice);

    res.status(200).json({ lists, totalCost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addItemToList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, quantity } = req.body; // Extract the new item's details from the request body
  
    const list = await ShoppingList.findById(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
  
    list.items.push({ name, quantity, bought: false }); // Add the new item to the list
  
    await list.save();
  
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeItemFromList = async (req, res) => {
  try {
      const { listId, itemId } = req.params;

      const list = await ShoppingList.findById(listId);
      if (!list) {
          return res.status(404).json({ message: 'List not found' });
      }

      const itemIndex = list.items.findIndex((item) => item._id.toString() === itemId);
      if (itemIndex === -1) {
          return res.status(404).json({ message: 'Item not found' });
      }

      list.items.splice(itemIndex, 1); // Remove the item from the list

      await list.save();

      res.json(list);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
