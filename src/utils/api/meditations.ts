import axios from '@/axios';
import { AllMeditations, Meditations } from '@/utils/types/meditation';

export const getAllMeditationsRequest = async (): Promise<Meditations[]> => {
    const response = await axios.get(`/api/meditations/getall`);
    return response.data.data;
};
