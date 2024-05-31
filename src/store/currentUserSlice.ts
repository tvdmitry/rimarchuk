import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../constants';
import { userGet } from '../utils/api/user';
import { UserError, UserGet } from '../utils/types';

export const getUser = createAsyncThunk('currentUser/getUser', async (_, { rejectWithValue }) => {
    try {
        return await userGet();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: UserGet = {
    data: {
        user_id: 0,
        user_name: '',
    },
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        getCurrentUser(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload.data;
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
