import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
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
    qr: string | null
}

// Стейт для слайса
interface TripState {
    trips: Trip[];
    loading: boolean;
    start_date?: string,
    end_date?: string,
    status?: string,
    error: string | null;
}

// Начальное состояние
const initialState: TripState = {
    trips: [],
    loading: false,
    start_date: '',
    end_date: '',
    status: '',
    error: null,
};

export const getTrips = createAsyncThunk(
    'trips/getTrips',
    async (_, { getState }) => {
        const { trips }: any = getState();
        const response = await api.trips.tripsList({start_date: trips.start_date, end_date: trips.end_date, status: trips.status});
        return response.data;
    }
);

export const rejectOrCompleteTrip = createAsyncThunk(
    'trips/rejectOrCompleteTrip',
    async ({ tripId, action }: { tripId: number; action: string }) => {
        const response = await api.trips.tripsFinishCreate(tripId, {action});  // Передаем только tripId и action
        return response.data;
    }
);

// Слайс
const tripSlice = createSlice({
    name: 'trips',
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<{ start_date?: string; end_date?: string; status?: string }>) {
            console.log("Payload:", action.payload);
            state.start_date = action.payload.start_date ?? state.start_date;
            state.end_date = action.payload.end_date ?? state.end_date;
            state.status = action.payload.status ?? state.status;
            console.log("Updated state:", state.start_date, state.end_date, state.status);
        },
        resetFilters(state) {
            state.start_date = '';
            state.end_date = '';
            state.status = '';
        },
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
        builder
            .addCase(rejectOrCompleteTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(rejectOrCompleteTrip.fulfilled, (state, action) => {
                state.loading = false;
                // Обновляем только измененную поездку
                const updatedTrip = action.payload;
                state.trips = state.trips.map((trip) =>
                    trip.id === updatedTrip.id ? { ...trip, status: updatedTrip.status, ended_at: updatedTrip.ended_at } : trip
                );
            })
            .addCase(rejectOrCompleteTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при изменении статуса заявок';
            });
    }
});
export const { setFilters} = tripSlice.actions
export default tripSlice.reducer;
