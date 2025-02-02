
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
    searchRouteTerm: string;
}

const initialState: SearchState = {
    searchRouteTerm: '',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchRouteTerm(state, action: PayloadAction<string>) {
            state.searchRouteTerm = action.payload;
        },
        resetFilters(state) {
            state.searchRouteTerm = '';
        },
    },
});

export const { setSearchRouteTerm,resetFilters } = searchSlice.actions;

export default searchSlice.reducer;
