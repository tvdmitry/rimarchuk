import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    modalType: '',
    firstShow: false,
    data: {
        affirmation: '',
        scrollShow: false,
        alreadyShow: false,
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
            state.data.scrollShow = false;
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
        openOnboardingManual: (state) => {
            state.modalType = 'ONBOARDINGMANUAL';
            state.isOpen = true;
        },
        openOnboardingHome: (state) => {
            state.modalType = 'ONBOARDINGHOME';
            state.isOpen = true;
        },
        openOnboardingCourse: (state) => {
            state.modalType = 'ONBOARDINGCOURSE';
            state.isOpen = true;
        },
        openOnboardingScrollDown: (state, action) => {
            state.modalType = 'ONBOARDINGSCROLLDOWN';
            state.isOpen = true;
            state.data.scrollShow = action.payload.scrollShow;
            state.data.alreadyShow = action.payload.alreadyShow;
        },
    },
});

export const {
    setOpen,
    closeModal,
    openOnboardingTasks,
    openOnboardingQuestions,
    openOnboardingAffirmation,
    openOnboardingManual,
    openOnboardingHome,
    openOnboardingCourse,
    openOnboardingScrollDown,
} = modalsSlice.actions;

export default modalsSlice.reducer;
