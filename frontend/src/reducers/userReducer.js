//User redux reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//Function for fetching from api
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (username) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}?username=${username}`)

        if (!response.ok) {
            console.log("error")
        }

        const user = await response.json()
        return { user }
    }
)

//Slice
export const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "",
        id: "",
        translations: [],
        loadingUser: false,
        loadedUser: false,
        startIndex: 0,
        error: null
    },
    reducers: {
        //Function for logging out, setting states to default
        logOut: (state) => {
            state.loadedUser = false
            state.username = ""
            state.translations = []
            state.id = ""
            state.startIndex = 0
        },
        //Function for setting user data without api
        setUser: (state, action) => {
            state.loadedUser = true
            state.username = action.payload.username
            state.translations = action.payload.translations
            state.id = action.payload.id
        },
        //Function for setting starting index for translations 
        setStartIndex: (state) => {
            state.startIndex = state.translations.length
        }
    },
    extraReducers: {
        //Fetch fulfilled extra reducer
        [fetchUser.fulfilled]: (state, action) => {
            state.translations = action.payload.translations
            state.loadingUser = false
            state.loadedUser = true
            state.id = action.payload.id
            state.username = action.payload.username
        },
        //Fetch pending extra reducer
        [fetchUser.pending]: (state, action) => {
            state.loadingUser = true
        },
    }
})

export const { logOut, setUser, setStartIndex } = userSlice.actions
export default userSlice.reducer
