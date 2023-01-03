import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchedText: '',
    posts: [],
};

const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setBlogPosts: (state, action) => {
            state.posts = action.payload;
        },
        setText: (state, action) => {
            state.searchedText = action.payload;
        },
        clearText: (state) => {
            state.searchedText = '';
        },
    },
});

export const { setBlogPosts, setText, clearText } = articleSlice.actions;

export default articleSlice.reducer;
