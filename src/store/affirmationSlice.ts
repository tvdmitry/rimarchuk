import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllAffirmationRequest } from '@/utils/api/affirmation';
import { AllAffirmations } from '@/utils/types/affirmation';

import { LoadingStatus } from '../constants';
import { UserError } from '../utils/types';

export const getAffirmationAll = createAsyncThunk('affirmation/getAllAffirmation', async (_, { rejectWithValue }) => {
    try {
        return await getAllAffirmationRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: AllAffirmations = {
    data: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const affirmationSlice = createSlice({
    name: 'affirmation',
    initialState,
    reducers: {
        getAllAffirmation(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAffirmationAll.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        }),
            builder.addCase(getAffirmationAll.fulfilled, (state, action) => {
                state.status = LoadingStatus.fulfilled;
                state.data = action.payload;
            });
        builder.addCase(getAffirmationAll.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllAffirmation } = affirmationSlice.actions;

export default affirmationSlice.reducer;
