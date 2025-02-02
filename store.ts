
import { configureStore } from '@reduxjs/toolkit';
import routes from './routeSlice.ts';
import user from './userSlice.ts'
import tripDraft from './tripDraftSlice.ts'
import trips from './tripsSlice.ts'
const store = configureStore({
    reducer: {
        routes: routes,
        users: user,
        tripDraft: tripDraft,
        trips: trips,
    },
});

export type RootState = ReturnType<typeof store.getState>; // Тип для состояния Redux
export type AppDispatch = typeof store.dispatch; // Тип для dispatch

export default store;
