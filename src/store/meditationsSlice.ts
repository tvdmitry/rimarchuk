import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllMeditationsRequest } from '@/utils/api/meditations';
import { AllMeditations } from '@/utils/types/meditation';

import { LoadingStatus } from '../constants';
import { UserError } from '../utils/types';

export const getMeditationsAll = createAsyncThunk('meditations/getMeditationsAll', async (_, { rejectWithValue }) => {
    try {
        return await getAllMeditationsRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: AllMeditations = {
    data: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const meditationsSlice = createSlice({
    name: 'meditations',
    initialState,
    reducers: {
        getAllMeditations(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMeditationsAll.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getMeditationsAll.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getMeditationsAll.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllMeditations } = meditationsSlice.actions;

export default meditationsSlice.reducer;
