import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '/src/api';
import {UserRegistration} from "./src/api/Api.ts";

interface UserState {
    username: string;
    first_name?:string;
    last_name?:string;
    email?:string;
    isAuthenticated: boolean;
    error?: string | null;
}

const initialState: UserState = {
    username: '',
    first_name: '',
    last_name:'',
    email:'',
    isAuthenticated: false,
    error: null,
};


export const regUserAsync = createAsyncThunk(
    'user/regUserAsync',
    async (data: UserRegistration, { rejectWithValue }) => {
        try {
            const response = await api.users.usersRegisterCreate(data)
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка регистрации');
        }
    }
);
// Асинхронное действие для авторизации
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.users.usersAuthCreate(credentials)
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка авторизации'); // Возвращаем ошибку в случае неудачи
        }
    }
);

// Асинхронное действие для деавторизации
export const logoutUserAsync = createAsyncThunk(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.users.usersDeauthCreate();
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при выходе из системы');
        }
    }
);

export const updateUserAsync = createAsyncThunk(
    'user/updateUserAsync',
    async (updatedData: { username?: string; email?: string; first_name?: string; last_name?: string; new_password?: string; confirm_password?: string }, { rejectWithValue }) => {
        try {
            const response = await api.users.usersUpdateUpdate(updatedData); // Ваш API-метод для обновления данных
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка обновления данных пользователя');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                const { username, email, first_name, last_name } = action.payload;
                state.username = username;
                state.email = email;
                state.first_name = first_name;
                state.last_name = last_name;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })

            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.username = '';
                state.email = '';
                state.first_name = '';
                state.last_name = '';
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateUserAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                const { username, email, first_name, last_name } = action.payload;
                state.username = username || state.username;
                state.email = email || state.email;
                state.first_name = first_name || state.first_name;
                state.last_name = last_name || state.last_name;
                state.error = null;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {} = userSlice.actions;
export default userSlice.reducer;