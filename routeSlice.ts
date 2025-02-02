import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '/src/api';
import { Route } from '/src/components/route-list/RouteList.tsx';
import {setId,setRouteCount} from './tripDraftSlice.ts'
interface RoutesState {
    searchRouteTerm: string;
    routes: Route[];
    selectedRoute: Route | null;  // Добавляем поле для выбранного маршрута
    loading: boolean;
    error: string | null;
}

const initialState: RoutesState = {
    searchRouteTerm: '',
    routes: [],
    selectedRoute: null,  // Инициализируем пустым значением
    loading: false,
    error: null,
};

// Получение списка маршрутов
export const getRoutesList = createAsyncThunk(
    'routes/getRoutesList',
    async (_, { getState,dispatch, rejectWithValue }) => {
        const { routes }: any = getState();
        try {

            const response = await api.routes.routesList({ origin: routes.searchRouteTerm });
            if (response.data.draft_trip) {
                const id = response.data.draft_trip.id;
                const routeCount = response.data.draft_trip.route_count;

                // Диспатчим данные
                dispatch(setId(id));
                dispatch(setRouteCount(routeCount));
                return response.data;
            } else {
                // Если draft_trip отсутствует
                console.error('draft_trip is missing in the response');

            }
            return response.data;
        } catch (error) {
            console.error('Error fetching routes:', error);
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

// Получение данных о конкретном маршруте
export const getRouteDetails = createAsyncThunk(
    'routes/getRouteDetails',
    async (routeId: number, { rejectWithValue }) => {
        try {
            const response = await api.routes.routesRead(routeId);
            console.log('API response for route details:', response);
            return response.data;
        } catch (error) {
            console.error('Error fetching route details:', error);
            return rejectWithValue('Ошибка при загрузке данных маршрута');
        }
    }
);

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setSearchRouteTerm(state, action: PayloadAction<string>) {
            state.searchRouteTerm = action.payload;
        },
        resetFilters(state) {
            state.searchRouteTerm = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRoutesList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRoutesList.fulfilled, (state, action) => {
                state.loading = false;
                state.routes = action.payload.routes;
            })
            .addCase(getRoutesList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Произошла ошибка';
            })
            // Обработка загрузки данных маршрута
            .addCase(getRouteDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRouteDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRoute = action.payload;  // Сохраняем данные маршрута
            })
            .addCase(getRouteDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Произошла ошибка';
            });
    },
});

export const { setSearchRouteTerm, resetFilters } = routesSlice.actions;

export default routesSlice.reducer;
