import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLogged: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLogged = true;
            state.user = action.payload;
        },
        loggedOut: (state) => {
            state.isLogged = false;
            state.user = null;
        },
    },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
