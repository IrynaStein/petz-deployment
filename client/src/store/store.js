import {configureStore} from '@reduxjs/toolkit'

import petsReducer from './petSlice'
import userReducer from './userSlice'
import gameReducer from './gameSlice'

const store = configureStore({
    reducer: {
        pets: petsReducer,
        user: userReducer,
        game: gameReducer
    }
})

export default store