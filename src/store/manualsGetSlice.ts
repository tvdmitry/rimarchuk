import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { getManualsRequest } from '@/utils/api/manuals';
import { UserError } from '@/utils/types';
import { ManualResponse } from '@/utils/types/manuals';

export const manualsGet = createAsyncThunk('manualsGet/manualsGet', async (id: number, { rejectWithValue }) => {
    try {
        return await getManualsRequest(+id);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: ManualResponse = {
    data: {
        id: 0,
        name: '',
        description: '',
        cost: 0,
        url_file: '',
    },
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const manualsGetSlice = createSlice({
    name: 'manualsGet',
    initialState,
    reducers: {
        manual(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(manualsGet.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(manualsGet.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(manualsGet.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { manual } = manualsGetSlice.actions;

export default manualsGetSlice.reducer;
