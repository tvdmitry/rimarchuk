import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAffirmationRandomRequest } from '@/utils/api/affirmation';
import { AffirmationEdit } from '@/utils/types/affirmation';

import { LoadingStatus } from '../constants';
import { UserError } from '../utils/types';

export const getRandomAffirmation = createAsyncThunk(
    'affirmation/getRandomAffirmation',
    async (_, { rejectWithValue }) => {
        try {
            return await getAffirmationRandomRequest();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: AffirmationEdit = {
    message: '',
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const affirmationEditSlice = createSlice({
    name: 'affirmationEdit',
    initialState,
    reducers: {
        getAllAffirmation(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRandomAffirmation.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getRandomAffirmation.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.message = action.payload.message;
        });
        builder.addCase(getRandomAffirmation.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllAffirmation } = affirmationEditSlice.actions;

export default affirmationEditSlice.reducer;
