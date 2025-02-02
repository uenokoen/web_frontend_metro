import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from "./src/api";

export interface Route {
    id: number;
    origin: string;
    destination: string;
    description: string;
    is_active: boolean;
    thumbnail: string;
    price: number;
}

export interface RouteTrip {
    route: Route;
    free: boolean;
    order: number;
    duration: number;
}

export interface RouteUpdate {
    free: boolean
}

export interface TripData {
    name: string | null;
    description: string | null;
    owner: string | null;
}
interface DraftRouteState {
    id: number | undefined;
    route_count: number | undefined;
    isDraft: boolean;

    routetrip_set: RouteTrip[];
    tripData: TripData;
    error: string | null;
    status: string
    loading: boolean;  // Для отслеживания загрузки
}

// Начальное состояние
const initialState: DraftRouteState = {
    id: NaN,
    route_count: NaN,
    isDraft: false,

    routetrip_set: [],
    tripData: {
        name: '',
        description: '',
        owner: '',
    },
    status: '',
    error: null,
    loading: false,  // Начинаем с того, что ничего не загружается
};

// Асинхронные действия (Thunks)

export const getTrips = createAsyncThunk(
    'trips/getTrips',
    async () => {
        const response = await api.trips.tripsList(); // Используем параметры запроса
        return response.data;
    }
);

export const getTrip = createAsyncThunk(
    'trip/getTrip',
    async (id: string) => {
        const response = await api.trips.tripsRead(id);
        return response.data;
    }
);

export const addRouteToTrip = createAsyncThunk(
    'routes/addRouteToTrip',
    async (routeId: number) => {
        const response = await api.routes.routesDrafttripCreate(routeId.toString());
        return response.data;
    }
);

export const deleteTrip = createAsyncThunk(
    'trips/deletetrip',
    async (id: string) => {
        const response = await api.trips.tripsDelete(id);
        return response.data;
    }
);

export const updateTrip = createAsyncThunk(
    'trip/updateTrip',
    async ({ id, data }: { id: string; data: TripData }) => {
        const tripDataToSend = {
            name: data.name ?? '',
            description: data.description ?? '',
            owner: data.owner ?? ''
        };
        const response = await api.trips.tripsUpdate(id,tripDataToSend );
        return response.data;
    }
);

export const updateRouteInTrip = createAsyncThunk(
    'trip/updateRoute',
    async ({ id, data }: { id: string; data: RouteUpdate }) => {
        const routeDatatoSend = {
            free: data.free ?? false
        };
        console.log('Данные для отправки (updateTrip):', data); // Логируем данные
        const response = await api.routes.routesTripUpdate(id,routeDatatoSend);
        console.log('Ответ от сервера (updateTrip):', response.data); // Логируем ответ
        return response.data;
    }
);

export const deleteRouteInTrip = createAsyncThunk(
    'trips/deleteRouteInTrip',
    async ({ id}: { id: string }) => {
        await api.routes.routesTripDelete(id);
    }
);

export const submitTrip = createAsyncThunk(
    'trips/sumbitTrip',
    async ({ id}: { id: string }) => {
        await api.trips.tripsFormCreate(id);
    }
);
// Создание слайса
const tripDraftSlice = createSlice({
    name: 'tripDraftSlice',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setRouteCount: (state, action) => {
            state.route_count = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTripData: (state, action) => {
            state.tripData = {
                ...state.tripData,
                ...action.payload
            }
        },
        setRouteInTripData: (state, action) => {
            const { routeId, free } = action.payload; // Извлекаем routeId и free
            state.routetrip_set = state.routetrip_set.map((routeItem) => {
                // Сравниваем ID маршрута (преобразуем routeId к числу для безопасности)
                if (routeItem.route.id === parseInt(routeId, 10)) {
                    return {
                        ...routeItem, // Копируем текущий элемент
                        free, // Обновляем только поле free
                    };
                }
                return routeItem; // Возвращаем остальные элементы без изменений
            });
        },
        setRoutes: (state, action) => {
            state.routetrip_set = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Обработка загрузки данных для getTrip
        builder
            .addCase(getTrip.pending, (state) => {
                state.loading = true;
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(getTrip.fulfilled, (state, action) => {
                state.loading = false;
                const trip = action.payload;
                state.routetrip_set = trip.routetrip_set;
                state.tripData.name = trip.name;
                state.tripData.description = trip.description;
                state.tripData.owner = trip.owner;
                state.isDraft = trip.status === 'DRAFT';
            })
            .addCase(getTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при получении данных.";
            });

        // Обработка добавления маршрута в корзину
        builder
            .addCase(addRouteToTrip.pending, (state) => {
                state.loading = true;
                state.error = null; // Сбрасываем ошибку
            })
            .addCase(addRouteToTrip.fulfilled, (state, action) => {
                state.loading = false;
                state.routetrip_set.push(action.payload); // Добавляем новый маршрут
            })
            .addCase(addRouteToTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при добавлении маршрута.";
            });
        builder
            .addCase(deleteTrip.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTrip.fulfilled,(state, action) => {
                state.loading = false;
                state.id = NaN;
                state.route_count = NaN;
                state.routetrip_set = []
                state.name = null
                state.description = null
                state.owner = null
            })
            .addCase(deleteTrip.rejected,(state,action) => {
                state.loading = false
                state.error = action.error.message || "Ошибка при удалении поездки.";
            })
        builder
            .addCase(submitTrip.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(submitTrip.fulfilled,(state, action) => {
                state.loading = false;
                state.id = NaN;
                state.route_count = NaN;
                state.routetrip_set = []
                state.name = null
                state.description = null
                state.owner = null
            })
            .addCase(submitTrip.rejected,(state,action) => {
                state.loading = false
                state.error = action.error.message || "Ошибка при формировании поездки.";
            })
        builder
            .addCase(updateTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTrip.fulfilled, (state, action) => {
                state.loading = false
                state.tripData = action.payload
            })
            .addCase(updateTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при обновлении поездки.";
            });
        builder
            .addCase(updateRouteInTrip.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRouteInTrip.fulfilled, (state, action) => {
                state.loading = false;
                const { routeId, free, order } = action.payload;
                const route = state.routetrip_set.find(r => r.route.id === routeId);
                if (route) {
                    route.free = free;
                    route.order = order
                }
            })
            .addCase(updateRouteInTrip.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при обновлении поездки.";
            });

    },
});

// Экспортируем действия и редюсер
export const { setId, setRouteCount,setError,setTripData ,setRouteInTripData,setRoutes} = tripDraftSlice.actions;
export default tripDraftSlice.reducer;
