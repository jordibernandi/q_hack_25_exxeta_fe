import { useMutation } from '@tanstack/react-query';
import {
    fetchRecommendCandidates, sendCandidateEmails
} from '@/features/recommender/api/recommender-api';

export const useRecommendCandidateMutation = () => {
    const mutation = useMutation({
        mutationFn: (body) => fetchRecommendCandidates(body),
        onSuccess: (data, variables, context) => {
            // Handle success (e.g., show a message, update cache)
            console.log('Successfully fetched candidates:', data);
        },
        onError: (error, variables, context) => {
            // Handle error (e.g., show an error message)
            console.error('Error fetching candidates:', error);
        },
    });

    return mutation;
}