import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { getAllManualsRequest } from '@/utils/api/manuals';
import { UserError } from '@/utils/types';
import { AllManuals } from '@/utils/types/manuals';

export const getManualsAll = createAsyncThunk('manuals/getManualsAll', async (_, { rejectWithValue }) => {
    try {
        return await getAllManualsRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: AllManuals = {
    data: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const manualsSlice = createSlice({
    name: 'manuals',
    initialState,
    reducers: {
        getAllManuals(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getManualsAll.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getManualsAll.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getManualsAll.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllManuals } = manualsSlice.actions;

export default manualsSlice.reducer;
