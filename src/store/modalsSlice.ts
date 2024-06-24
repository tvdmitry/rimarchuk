import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    modalType: '',
    firstShow: false,
    data: {
        affirmation: '',
    },
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.firstShow = action.payload;
        },
        closeModal: (state) => {
            state.modalType = '';
            state.isOpen = false;
        },
        openOnboardingTasks: (state) => {
            state.modalType = 'ONBOARDINGTASKS';
            state.isOpen = true;
        },
        openOnboardingQuestions: (state) => {
            state.modalType = 'ONBOARDINGQUESTIONS';
            state.isOpen = true;
        },
        openOnboardingAffirmation: (state, action) => {
            state.modalType = 'ONBOARDINGAFFIRMATION';
            state.isOpen = true;
            state.data.affirmation = action.payload;
        },
    },
});

export const { setOpen, closeModal, openOnboardingTasks, openOnboardingQuestions, openOnboardingAffirmation } =
    modalsSlice.actions;

export default modalsSlice.reducer;
