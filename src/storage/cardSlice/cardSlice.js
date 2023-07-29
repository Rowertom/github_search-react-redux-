import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { slicePosts } from "../../utils/utils";

// action по загрузке юзеров
export const fetchSearchCards = createAsyncThunk(
    'cards/fetchSearchCards',
    async function (
        search,
        { extra, fulfillWithValue, rejectWithValue }
    ) {
        try {
            const cards = await extra.searchUsers(search);
            return fulfillWithValue(cards);
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: [],
    posts: [],
    total: 0,
    page: 1,
    begin: 0,
    end: 6,
    pageSize: 6,

}

const cardSlice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        //смена страницы каталога
        setPage: (state, action) => {
            state.page = action.payload;
            state.begin = (state.page - 1) * state.pageSize;
            state.end = (state.page - 1) * state.pageSize + state.pageSize;
            state.posts = slicePosts(state.data, state.begin, state.end);
        },
        //больше постов
        setMoreCountPosts: (state, action) => {
            state.pageSize = state.pageSize + 3;
            state.end = state.end + 3;
            state.posts = slicePosts(state.data, state.begin, state.end);
        },
        //больше постов
        setLessCountPosts: (state, action) => {
            state.pageSize = state.pageSize - 3;
            state.end = state.end - 3;
            state.posts = slicePosts(state.data, state.begin, state.end);
        },
        //очистить список постов
        clearPosts: (state, action) => {
            state.data = [];
            state.posts = [];
            state.total = 0;
            state.page = 1;
            state.begin = 0;
            state.end = 6;
            state.pageSize = 6;
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchSearchCards.fulfilled, (state, action) => {
            state.data = [...action.payload.items]
            state.total = state.data.length;
            state.posts = slicePosts(state.data, state.begin, state.end);
        })

    }
})

export const { setPage, setMoreCountPosts, setLessCountPosts, clearPosts } = cardSlice.actions;

export default cardSlice.reducer;