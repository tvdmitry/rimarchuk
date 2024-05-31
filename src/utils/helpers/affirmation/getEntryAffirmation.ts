import { AllAffirmations } from '@/utils/types/affirmation';

export const getEntryAffirmation = (affirmations: AllAffirmations, userId: number | undefined) => {
    return affirmations.data.find((item) => item.id === userId)?.affirmation;
};
