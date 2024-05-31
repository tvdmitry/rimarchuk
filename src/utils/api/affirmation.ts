import axios from '@/axios';

import { Affirmation, AffirmationEditResponse } from '../types/affirmation';

export const getAllAffirmationRequest = async (): Promise<Affirmation[]> => {
    const response = await axios.get(`/api/affirmation/getall`);
    return response.data.data;
};

export const getAffirmationRandomRequest = async (): Promise<AffirmationEditResponse> => {
    const response = await axios.get(`/api/affirmation/editday`);
    return response.data;
};
