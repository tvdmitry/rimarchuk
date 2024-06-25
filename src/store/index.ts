import { configureStore } from '@reduxjs/toolkit'
import affirmationEditReducer from './affirmationEditSlice'
import affirmationReducer from './affirmationSlice'
import authReducer from './authSlice'
import checkPayReducer from './checkPaySlice'
import currentUserReducer from './currentUserSlice'
import manualsGetReducer from './manualsGetSlice'
import manualsReducer from './manualsSlice'
import meditationsReducer from './meditationsSlice'
import modalsSliceReducer from './modalsSlice'
import payContentReducer from './payContentSlice'
import userReducer from './userSlice'
import videosReducer from './videosSlice'
import waterAddReducer from './waterAddSlice'
import waterGetReducer from './waterGetSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        affirmation: affirmationReducer,
        currentUser: currentUserReducer,
        auth: authReducer,
        affirmationEdit: affirmationEditReducer,
        waterGet: waterGetReducer,
        waterAdd: waterAddReducer,
        meditations: meditationsReducer,
        videos: videosReducer,
        manuals: manualsReducer,
        manualsGet: manualsGetReducer,
        payContent: payContentReducer,
        checkPay: checkPayReducer,
        modals: modalsSliceReducer,
    },
});
