import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { addUserRequest, getAllUsersRequest } from '@/utils/api/user';
import { AllUsers, User, UserError } from '@/utils/types';

export const getUsersAll = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
    try {
        return await getAllUsersRequest();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addNewUser = createAsyncThunk(
    'user/addUser',
    async ({ user_id, user_name }: User, { rejectWithValue }) => {
        try {
            const user: User = {
                user_id,
                user_name,
                water_ml: 0,
                user_img: null,
            };

            return await addUserRequest(user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: AllUsers = {
    data: [],
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAllUsers(_, action) {
            return action.payload;
        },
        addUser(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersAll.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getUsersAll.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getUsersAll.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
        builder.addCase(addNewUser.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(addNewUser.fulfilled, (state) => {
            state.status = LoadingStatus.fulfilled;
        });
        builder.addCase(addNewUser.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { getAllUsers, addUser } = userSlice.actions;

export default userSlice.reducer;
