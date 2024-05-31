import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllVideosRequest } from '@/utils/api/videos';
import { AllVideos } from '@/utils/types/videos';

import { LoadingStatus } from '../constants';
import { UserError } from '../utils/types';

export const getVideosAll = createAsyncThunk('videos/getVideosAll', async (_, { rejectWithValue }) => {
    try {
        return await getAllVideosRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: AllVideos = {
    data: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        getAllVideos(state, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getVideosAll.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getVideosAll.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getVideosAll.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllVideos } = videosSlice.actions;

export default videosSlice.reducer;
