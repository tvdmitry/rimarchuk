import { closeModal, nextStep } from '@/store/modalsSlice'
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
    
    const closeCallBack = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    const nextStepCallback = useCallback(() => {
        dispatch(nextStep());
    }, [dispatch]);

    return ReactDOM.createPortal(
        <ModalWindow close={closeCallBack} isOpen={modals.isOpen}>
            {modals.modalType === 'ONBOARDINGTASKS' && <OnboardingTasks next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGQUESTIONS' && <OnboardingQuestions next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGAFFIRMATION' && <OnboardingAffirmation next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGMANUAL' && <OnboardingManual next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGHOME' && <OnboardingHome next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGCOURSE' && <OnboardingCourse next={nextStepCallback} />}
            {modals.modalType === 'ONBOARDINGSCROLLDOWN' && <OnboardingScrollDown next={nextStepCallback} />}
        </ModalWindow>,
        portal
    );
};
