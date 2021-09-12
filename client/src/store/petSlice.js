import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPets = createAsyncThunk("pets/fetchPets", async () => {
  const response = await fetch("/pets", {
    method: "GET",
    credentials: "include"
  });
  const data = await response.json();
  return data;
});

export const deletePet = createAsyncThunk("/pets/deletePet", async (id) => {
  const response = await fetch(`pets/${id}`, { 
    method: "DELETE",
    credentials: "include" 
  });
  const data = await response.json();
  return data;
});

export const createPet = createAsyncThunk("pets/createPet", async (pet) => {
  const response = await fetch("/pets", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    credentials: "include",
    body: JSON.stringify(pet),
  });
  const data = await response.json();
  return data;
});

export const updatePet = createAsyncThunk("pets/updatePet", async (pet) => {
  const response = await fetch(`/pets/${pet.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      sleepy: pet.sleepy,
      alive: pet.alive,
      bored: pet.bored,
      healthy: pet.healthy,
      hungry: pet.hungry,
    }),
  });
  const data = await response.json();
  return data;
});

const initialState = {
  petList: [],
  pet: [],
  dirty: Math.floor(Math.random() * 4) + 1,
  notification: "",
  status: "idle",
  errors: [],
};

const petSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    gamePet(state, action) {
      state.pet = action.payload;
    },
    petFeed(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      if (state.pet.hungry < 4) {
        state.pet.hungry += 1;
        state.pet.sleepy -= 1;
        state.notification = "I am still hungry!";
      } else {
        state.notification = "Thank you, I am full";
      }
    },
    getHungry(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.hungry -= 1;
      state.notification = ""
    },
    petPlay: (state, action) => {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      if (state.pet.bored < 4) {
        state.pet.bored += 1;
        state.dirty -= 1;
        state.pet.sleepy -= 1;
        state.pet.hungry -= 1;
        state.notification = "Can we play more, please?";
      } else {
        state.notification = "I am tierd an dont want to play anymore";
      }
    },
    getBored(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.bored -= 1;
    },
    petSleep(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.sleepy = 4;
      state.notification = "Z-z-z-z-z...."
    },
    getSleepy(state) {
      state.pet.sleepy = state.pet.sleepy - 1;
    },
    petClean(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.dirty = 4;
      if (state.pet.bored < 4){
        state.pet.bored += 1;
      } else {
        return 
      }
      state.pet.sleepy -= 1;
      state.notification = "Bubbly bath! I love it"
    },
    getDirty(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.dirty -= 1;
      if (state.dirty < -1){
        state.notification = "I am stinky! Please give me a bath"
      } else {
        state.notification = ""
      }
     
    },
    petDead(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.alive = false;
      state.notification = `We are sorry to inform you that ${state.pet.name} passed away.`
    },
    getSick(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.healthy = Math.random() < 0.8;
      if (!state.pet.healthy){
        state.pet.bored = 0
        state.dirty = 0
        state.pet.hungry = 0
        state.pet.sleepy = 0
        state.notification = "I am not feeling well. Please take me to the vet!"
      } else {
        return 
      }
    },
    gotoVet(state, action) {
      state.pet = state.petList.find((pet) => pet.id === action.payload);
      state.pet.alive = Math.random() < 0.8;
      if (state.pet.alive) {
        state.pet.healthy = true;
        state.pet.sleepy = 4
        state.pet.hungry = 4
        state.notification = `Vet says: "Your pet can go home now. It is healthy and happy again. Take care!!!"`;
        state.pet.bored = 4
        state.dirty = 4
      } else {
        state.notification = `Nurse says: "Vet tried everything, but unfortunately was not able to cure your pet. We are so sorry for your loss!"`;
      }
    },
  },
  extraReducers: {
    [fetchPets.pending](state) {
      state.status = "loading";
    },
    [fetchPets.fulfilled](state, action) {
      state.status = "idle";
      if (action.payload.errors) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = []
        state.petList = action.payload;
      }
    },
    [fetchPets.rejected](state, action) {
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [deletePet.pending](state) {
      state.status = "loading";
    },
    [deletePet.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors){
        state.errors = action.payload.errors
      }
      else {
        state.petList = state.petList.filter(
          (pet) => pet.id !== action.payload.id)
      }
    },
    [deletePet.rejected](state, action){
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [createPet.pending](state) {
      state.status = "loading";
    },
    [createPet.fulfilled](state, action) {
      state.status = "completed";
     
      if (action.payload.errors) {
        state.errors = action.payload.errors
      } else {
        state.petList.push(action.payload);
        state.errors = [];
      }
    },
    [createPet.rejected](state,action){
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    },
    [updatePet.pending](state) {
      state.status = "pending";
    },
    [updatePet.fulfilled](state, action) {
      state.status = "completed";
      if (action.payload.errors) {
        state.errors = action.payload.errors
      } else {
        state.pet = action.payload;
        state.errors = [];
      }
    },
    [updatePet.rejected](state, action){
      state.status = "rejected";
      if (action.payload) {
        state.errors = action.payload.errorMessage;
      } else {
        state.errors = action.error.message;
      }
    }
  },
});

export const petActions = petSlice.actions;

export default petSlice.reducer;
