import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpen: false,
    modalType: '',
    firstShow: false,
    currentStep: 0, // Добавлено состояние для текущего шага
    isLoading: false, // Добавлено состояние для отображения индикатора загрузки
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
        openModal: (state, action) => {
            state.modalType = action.payload;
            state.isOpen = true;
            state.isLoading = true;
        },
        nextStep: (state) => {
            state.currentStep += 1;
            const modalSteps = [
                'ONBOARDINGTASKS',
                'ONBOARDINGQUESTIONS',
                'ONBOARDINGAFFIRMATION',
                'ONBOARDINGMANUAL',
                'ONBOARDINGHOME',
                'ONBOARDINGCOURSE',
                'ONBOARDINGSCROLLDOWN',
            ];
            if (state.currentStep < modalSteps.length) {
                state.modalType = modalSteps[state.currentStep];
            } else {
                state.isOpen = false;
            }
        },
        setData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
            state.isLoading = false;
        },
    },
});

export const { setOpen, closeModal, openModal, nextStep, setData } = modalsSlice.actions;

export default modalsSlice.reducer;
