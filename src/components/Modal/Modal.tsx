import { closeModal } from '@/store/modalsSlice'
import { Modals, ModalsResponse } from '@/utils/types/modals'
import { useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ModalWindow } from './ModalWindow/ModalWindow'
import { OnboardingAffirmation } from './OnboardingAffirmation/OnboardingAffirmation'
import { OnboardingQuestions } from './OnboardingQuestions/OnboardingQuestions'
import { OnboardingTasks } from './OnboardingTasks/OnboardingTasks'

const portal = document.getElementById('onboard');
export const Modal = () => {
    const dispatch = useDispatch();
    const modals: Modals = useSelector((state: ModalsResponse) => state.modals);
    const closeCallBack = useCallback(() => {
        dispatch(closeModal());
    }, []);
    return ReactDOM.createPortal(
        <ModalWindow close={closeCallBack} isOpen={modals.isOpen}>
            {modals.modalType === 'ONBOARDINGTASKS' && <OnboardingTasks />}
            {modals.modalType === 'ONBOARDINGQUESTIONS' && <OnboardingQuestions />}
            {modals.modalType === 'ONBOARDINGAFFIRMATION' && <OnboardingAffirmation />}
        </ModalWindow>,
        portal
    );
};
