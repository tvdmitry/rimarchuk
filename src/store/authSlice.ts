import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { auth } from '@/utils/api/user';
import { AuthUser, UserError } from '@/utils/types';

export const authToken = createAsyncThunk('auth/authToken', async (user_id: number, { rejectWithValue }) => {
    try {
        return await auth(+user_id);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: AuthUser = {
    user: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        tokenAuth(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authToken.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(authToken.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.user = action.payload.user;
        });
        builder.addCase(authToken.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { tokenAuth } = authSlice.actions;

export default authSlice.reducer;
