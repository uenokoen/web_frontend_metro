import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '/src/api';
import { Route } from '/src/components/route-list/RouteList.tsx';
import {resetId, resetRouteCount, setId, setRouteCount} from './tripDraftSlice.ts'
interface RoutesState {
    searchRouteTerm: string;
    routes: Route[];
    selectedRoute: Route | null;
    routeAttributes: Record<string, string>;
    loading: boolean;
    error: string | null;
}

const initialState: RoutesState = {
    searchRouteTerm: '',
    routes: [],
    selectedRoute: null,
    routeAttributes: {},
    loading: false,
    error: null,
};

export const getRouteAttributes = createAsyncThunk(
    'routes/getRouteAttributes',
    async (routeId: number, { rejectWithValue }) => {
        try {
            const response = await api.attributes.attributesRead(routeId);
            return response.data.attributes; // Ожидаем объект атрибутов
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке атрибутов маршрута');
        }
    }
);

export const addRouteAttribute = createAsyncThunk(
    'routes/addRouteAttribute',
    async (
        { routeId, attributeName, attributeValue }: { routeId: number, attributeName: string, attributeValue: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.attributes.attributesCreate(routeId, { attribute_name: attributeName, attribute_value: attributeValue });
            return { routeId, attributeName, attributeValue };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return rejectWithValue('Ошибка добавления атрибута');
        }
    }
);
export const deleteRouteAttribute = createAsyncThunk(
    'routes/deleteRouteAttribute',
    async (
        { routeId, attributeName }: { routeId: number, attributeName: string },
        { rejectWithValue }
    ) => {
        try {
            await api.attributes.attributesDelete(routeId, { attribute_name: attributeName });
            return { routeId, attributeName };
        } catch (error) {
            return rejectWithValue('Ошибка удаления атрибута');
        }
    }
);
export const updateRouteAttribute = createAsyncThunk(
    'routes/updateRouteAttribute',
    async (
        { routeId, attributeName, newValue }: { routeId: number, attributeName: string, newValue: string },
        { rejectWithValue }
    ) => {
        try {
            await api.attributes.attributesEdit(routeId, { attribute_name: attributeName, new_value: newValue });
            return { routeId, attributeName, newValue };
        } catch (error) {
            return rejectWithValue('Ошибка обновления атрибута');
        }
    }
);
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
                dispatch(setId(id));
                dispatch(setRouteCount(routeCount));
                return response.data;
            } else {
                dispatch(resetId())
                dispatch(resetRouteCount())
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
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных маршрута');
        }
    }
);

export const updateRouteAsync = createAsyncThunk(
    'routes/updateRouteAsync',
    async (
        { routeId, updatedData }: { routeId: number, updatedData: { origin?: string; destination?: string; description?: string; price?: number; is_active?: boolean } },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.routes.routesUpdate(routeId, updatedData); // Ваш API-метод для обновления данных
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка обновления данных маршрута');
        }
    }
);

export const deleteRouteAsync = createAsyncThunk(
    'routes/deleteRouteAsync',
    async (
        { routeId}: { routeId: number},
        { rejectWithValue }
    ) => {
        try {
            const response = await api.routes.routesDelete(routeId); // Ваш API-метод для обновления данных
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка удаления маршрута');
        }
    }
);

export const addPicInRoute = createAsyncThunk(
    'routes/addPicInRoute',
    async (
        { routeId, dataPic }: { routeId: number, dataPic: FormData },
        { rejectWithValue }
    ) => {
        try {
            const response = await api.routes.routesImageCreate(routeId, dataPic); // ваш API-метод для обновления
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка добавления картинки');
        }
    }
);

export const createRoute = createAsyncThunk(
    'routes/createRoute',
    async (
        {data}: {data: { origin?: string; destination?: string; description?: string; price?: number}},
        { rejectWithValue }
    ) => {
        try {
            const response = await api.routes.routesCreate(data); // ваш API-метод для обновления
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка добавления маршрута');
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
            })
        builder
            .addCase(getRouteAttributes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRouteAttributes.fulfilled, (state, action) => {
                state.loading = false;
                state.routeAttributes = action.payload;
            })
            .addCase(getRouteAttributes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addRouteAttribute.fulfilled, (state, action) => {
                const { routeId, attributeName, attributeValue } = action.payload;

                if (!state.routeAttributes[routeId]) {
                    state.routeAttributes[routeId] = {};
                }
                state.routeAttributes[routeId][attributeName] = { name: attributeName, value: attributeValue };
            })
            .addCase(addRouteAttribute.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteRouteAttribute.fulfilled, (state, action) => {
                const { routeId, attributeName } = action.payload;

                if (state.routeAttributes[routeId]) {
                    delete state.routeAttributes[routeId][attributeName]; // Удаляем атрибут сразу
                }
            })
            .addCase(deleteRouteAttribute.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(updateRouteAttribute.fulfilled, (state, action) => {
                const { routeId, attributeName, newValue } = action.payload;

                if (state.routeAttributes[routeId] && state.routeAttributes[routeId][attributeName]) {
                    state.routeAttributes[routeId][attributeName].value = newValue; // Обновляем значение атрибута сразу
                }
            })
            .addCase(updateRouteAttribute.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setSearchRouteTerm, resetFilters } = routesSlice.actions;

export default routesSlice.reducer;
