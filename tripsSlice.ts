import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from "./src/api";

// Интерфейс для данных заявки
export interface Trip {
    id: number;
    user: string;
    moderator: string | null;
    status: string; // или другие возможные статусы
    name: string;
    description: string;
    created_at: string; // строка с датой
    owner: string;
    formed_at: string | null;
    ended_at: string | null;
    duration_total: number | null;
}

// Стейт для слайса
interface TripState {
    trips: Trip[];
    loading: boolean;
    error: string | null;
}

// Начальное состояние
const initialState: TripState = {
    trips: [],
    loading: false,
    error: null,
};

export const getTrips = createAsyncThunk(
    'trips/getTrips',
    async () => {
        const response = await api.trips.tripsList();  // Предполагается, что есть такой метод
        return response.data;
    }
);

// Слайс
const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrips.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTrips.fulfilled, (state, action) => {
                state.loading = false;
                state.trips = action.payload;
            })
            .addCase(getTrips.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при получении заявок';
            });
    }
});

export default tripSlice.reducer;
