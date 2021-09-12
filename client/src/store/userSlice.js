import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk("user/createUser", async (formData) => {
  const response = await fetch("/signup", {
    method: "POST",
    credentials: "include",
    body: formData
  });
  const data = await response.json();
  return data;
});



export const deleteUser = createAsyncThunk("/user/deleteUser", async (id) => {
  const response = await fetch(`/users/${id}`, { 
      method: "DELETE",
      credentials: "include"
 });
  const data = await response.json();
  return data;
});

export const onLogin = createAsyncThunk("user/onLogin", async (user) => {
    const response = await fetch("/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(user)
    })
    const data = await response.json()
    return data
})

export const onLogout = createAsyncThunk("user/onLogout", async() => {
    const response = await fetch("/logout", {
        method: "DELETE",
        credentials: "include"
    })
    const data = await response.json()
    console.log(data)
    return data
})

export const updateUser = createAsyncThunk(
  "/user/updateUser",
  async (updatedUser, id) => {
    const response = await fetch(`/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updatedUser, id),
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  user: null,
  status: "",
  isLoading: true,
  errors: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.user = action.payload;
    },
    toogleLoading(state, action){
        state.isLoading = action.payload
    }
  },
  extraReducers: {
    [createUser.pending](state) {
      state.status = "loading";
    },
    [createUser.fulfilled](state, action) {
      state.status = "idle";
      if (action.payload.errors) {
        state.errors = action.payload.errors
      } else {
        state.user = action.payload;
        state.errors = [];
      }
    },
    [createUser.rejected](state, action){
        state.status = "rejected"
        if (action.payload) {
            state.errors = action.payload.errorMessage;
          } else {
            state.errors = action.error.message;
          }
    },
    [deleteUser.pending](state) {
      state.status = "loading";
    },
    [deleteUser.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors) {
        state.errors = action.payload.errors
      } else {
        state.user = null;
        state.errors = [];
      }
    },
    [deleteUser.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [updateUser.pending](state){
        state.status = "pending"
    },
    [updateUser.fulfilled](state, action){
        state.status = "updated"
        if (action.payload.errors) {
            state.errors = action.payload.errors
          } else {
            state.user = action.payload
            state.errors = [];
          }
    },
    [updateUser.rejected](state, action){
        state.status = "rejected"
        if (action.payload) {
            state.errors = action.payload.errorMessage;
          } else {
            state.errors = action.error.message;
          }
    },
    [onLogin.pending](state){
        state.status = "pending"
    },
    [onLogin.fulfilled](state, action){
        state.status = "completed"
        if (action.payload.errors){
            state.errors = action.payload.errors
        }
        else {
            state.user = action.payload
            state.errors = []
        }
    },
    [onLogin.rejected](state,action){
        if (action.payload) {
            state.errors = action.payload.errorMessage;
          } else {
            state.errors = action.error.message;
          }
    },
    [onLogout.pending](state){
        state.status = "pending"
    },
    [onLogout.fulfilled](state, action){
        state.status = "completed"
        if (action.payload.errors){
            state.errors = action.payload.errors
        }
        else {
            state.user = null
            state.errors =[]
        }
    },
    [onLogout.rejected](state, action){
        if (action.payload) {
            state.errors = action.payload.errorMessage;
          } else {
            state.errors = action.error.message;
          }
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
