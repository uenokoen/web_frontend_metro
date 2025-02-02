
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice.ts';

const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // Тип для состояния Redux
export type AppDispatch = typeof store.dispatch; // Тип для dispatch

export default store;
