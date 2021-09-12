import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCemetery = createAsyncThunk("cemetery/fetchCemetery", async() => {
    const response = await fetch('/cemetery', {
        method: "GET",
        credentials: "include"
    }
    )
    const data = await response.json()
    return data
})

const initialState = {
    status: "",
    cemetery: [],
    notifications: "",
    gamePaused: false,
    errors: []
}

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        pauseGame(state, action){
            if (action.payload){
                state.gamePaused = action.payload
            }
            else {
                state.gamePaused = !state.gamePaused
            } 
        }
    },
    extraReducers: {
        [fetchCemetery.pending](state){
            state.status = "loading"
        },
        [fetchCemetery.fulfilled](state, action){
            state.status = "completed"
            if (action.payload.errors) {
                state.errors = action.payload.errors
              } else {
                state.cemetery = action.payload
                state.errors = []
              }
            
        },
        [fetchCemetery.rejected](state, action){
            state.status = "rejected"
            if (action.payload) {
                state.errors = action.payload.errorMessage;
              } else {
                state.errors = action.error.message;
              }
        }
    }
})

export const gameActions = gameSlice.actions
export default gameSlice.reducer