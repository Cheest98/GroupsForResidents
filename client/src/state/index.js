import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  tasks: [],
  groups:[],
  shoppingLists: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.user };
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setGroups: (state, action) => {
      state.groups = action.payload.groups;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks || [];
    },
    setTask: (state, action) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action.payload.task._id) {
          return action.payload.task;
        }
        return task;
      });
      state.tasks = updatedTasks;
    },
    setShoppingLists: (state, action) => {
      state.shoppingLists = action.payload.shoppingLists || [];
    },
    setShoppingList: (state, action) => {
      const updatedShoppingLists = state.shoppingLists.map((list) => {
        if (list._id === action.payload.list._id) {
          return action.payload.list;
        }
        return list;
      });
      state.shoppingLists = updatedShoppingLists;
    },

    deleteList: (state, action) => {
      const listId = action.payload;
      const updatedLists = state.shoppingLists.filter((list) => list._id !== listId);
      state.shoppingLists = updatedLists;
    },


  },
});

export const {
  setUser,
  setGroups,
  setMode,
  setLogin,
  setLogout,
  setPosts,
  setPost,
  setTasks,
  setTask,
  setShoppingList,
  setShoppingLists,
  updateTotalPrice,
  deleteItem,
  deleteList,
} = authSlice.actions;

export default authSlice.reducer;