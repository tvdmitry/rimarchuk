import { closeModal } from '@/store/modalsSlice'
import { Modals, ModalsResponse } from '@/utils/types/modals'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ModalWindow } from './ModalWindow/ModalWindow'
import { OnboardingAffirmation } from './OnboardingAffirmation/OnboardingAffirmation'
import { OnboardingCourse } from './OnboardingCourse/OnboardingCourse'
import { OnboardingHome } from './OnboardingHome/OnboardingHome'
import { OnboardingManual } from './OnboardingManual/OnboardingManual'
import { OnboardingQuestions } from './OnboardingQuestions/OnboardingQuestions'
import { OnboardingScrollDown } from './OnboardingScrollDown/OnboardingScrollDown'
import { OnboardingTasks } from './OnboardingTasks/OnboardingTasks'

const portal = document.getElementById('onboard');
export const Modal = () => {
    const dispatch = useDispatch();
    const modals: Modals = useSelector((state: ModalsResponse) => state.modals);
    const alreadyShow = useSelector((state: ModalsResponse) => state.modals.data.alreadyShow);
    const closeCallBack = useCallback(() => {
        dispatch(closeModal());
    }, []);
    return ReactDOM.createPortal(
        <ModalWindow close={closeCallBack} isOpen={modals.isOpen}>
            {modals.modalType === 'ONBOARDINGTASKS' && <OnboardingTasks />}
            {modals.modalType === 'ONBOARDINGQUESTIONS' && <OnboardingQuestions />}
            {modals.modalType === 'ONBOARDINGAFFIRMATION' && <OnboardingAffirmation />}
            {modals.modalType === 'ONBOARDINGMANUAL' && <OnboardingManual />}
            {modals.modalType === 'ONBOARDINGHOME' && <OnboardingHome />}
            {modals.modalType === 'ONBOARDINGCOURSE' && <OnboardingCourse />}
            {modals.modalType === 'ONBOARDINGSCROLLDOWN' && !alreadyShow ? <OnboardingScrollDown /> : null}
        </ModalWindow>,
        portal
    );
};
