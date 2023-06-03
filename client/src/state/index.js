import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  tasks: [],
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
  },
});

export const {
  setUser,
  setMode,
  setLogin,
  setLogout,
  setPosts,
  setPost,
  setTasks,
  setTask,
} = authSlice.actions;

export default authSlice.reducer;