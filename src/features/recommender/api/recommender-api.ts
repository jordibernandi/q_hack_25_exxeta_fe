import { axiosInstance5000, axiosInstance5001 } from '@/lib/api/axios-instance';

export const fetchRecommendCandidates = async (body): Promise<undefined> => {
    const { data } = await axiosInstance5000.post('/weighted_recommend_candidates', body);
    return data;
};

export const sendCandidateEmails = async (body): Promise<undefined> => {
    const { data } = await axiosInstance5001.post('/email_sender', body);
    return data;
};