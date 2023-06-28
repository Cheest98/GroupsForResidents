import mongoose from 'mongoose';

const shoppingItemSchema = mongoose.Schema({
  name: String,
  quantity: Number,
  bought: { type: Boolean, default: false }
});

const shoppingListSchema = mongoose.Schema({
  name: String,
  items: [shoppingItemSchema],
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  completed: { type: Boolean, default: false },
  totalPrice: { type: Number, default: 0 }, // Add a totalPrice field to the list
  completedAt: Date // Add a completedAt field to track when the list is completed
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

export default ShoppingList;