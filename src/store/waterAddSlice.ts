import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { addWaterRequest, delWaterRequest } from '@/utils/api/water';
import { UserError } from '@/utils/types';
import { AddWater, AddWaterResponse } from '@/utils/types/water';

export const addVolumeWater = createAsyncThunk(
    'waterAdd/addVolumeWater',
    async ({ user_id, water_ml }: AddWater, { rejectWithValue }) => {
        try {
            const water: AddWater = {
                user_id,
                water_ml,
            };

            return await addWaterRequest(water);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const delVolumeWater = createAsyncThunk(
    'waterDel/delVolumeWater',
    async ({ user_id, water_ml }: AddWater, { rejectWithValue }) => {
        try {
            const water: AddWater = {
                user_id,
                water_ml,
            };

            return await delWaterRequest(water);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: AddWaterResponse = {
    message: '',
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const waterAddSlice = createSlice({
    name: 'waterAdd',
    initialState,
    reducers: {
        addWater(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addVolumeWater.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(addVolumeWater.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.message = action.payload.message;
        });
        builder.addCase(addVolumeWater.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
        builder.addCase(delVolumeWater.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(delVolumeWater.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.message = action.payload.message;
        });
        builder.addCase(delVolumeWater.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { addWater } = waterAddSlice.actions;

export default waterAddSlice.reducer;
