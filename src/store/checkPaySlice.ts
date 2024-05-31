import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { getCheckPayRequest } from '@/utils/api/pay';
import { CheckPayError, DataCheckPay } from '@/utils/types/pay';

export const getCheckPay = createAsyncThunk('checkPay/getCheckPay', async (_, { rejectWithValue }) => {
    try {
        return await getCheckPayRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: DataCheckPay = {
    data: {
        course_id: [],
        manuals_id: [],
    },
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const checkPaySlice = createSlice({
    name: 'checkPay',
    initialState,
    reducers: {
        getPayCheck(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCheckPay.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getCheckPay.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getCheckPay.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as CheckPayError).status;
        });
    },
});

export const { getPayCheck } = checkPaySlice.actions;

export default checkPaySlice.reducer;
