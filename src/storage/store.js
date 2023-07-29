import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./cardSlice/cardSlice";
import { api } from "../utils/api";


const store = configureStore({
    reducer: {
        cards: cardSlice
    },
    middleware:
        (getDefaultMiddleware) => getDefaultMiddleware({
            thunk:{
                extraArgument: api
            },
        })
})
export default store;