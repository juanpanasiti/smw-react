import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { apiRenewToken, apiLogin, apiRegister } from '../auth/api';
import { AuthData } from '../auth/interfaces';
import { removeToken } from '../auth/helpers';

const AUTH_STATUS_QUERY_KEY = 'authStatus';
const STALE_TIME = 1000 * 60 * 60 * 12

export const useAuth = () => {
    const navigate = useNavigate();
    const authQuery = useQuery<Partial<AuthData>>({
        queryKey: [AUTH_STATUS_QUERY_KEY],
        queryFn: apiRenewToken,
        staleTime: STALE_TIME,
        retryOnMount: false,
        retry: false,
        refetchInterval: STALE_TIME,
    });

    const queryClient = useQueryClient();
    const handleAuth = (data: AuthData) => {
        queryClient.setQueryData([AUTH_STATUS_QUERY_KEY], data);
    };
    const loginMutation = useMutation({
        mutationFn: apiLogin,
        onSuccess: handleAuth,
    });
    const registerMutation = useMutation({
        mutationFn: apiRegister,
        onSuccess: handleAuth,
    });

    const setLogout = () => {
        removeToken()
        queryClient.setQueryData([AUTH_STATUS_QUERY_KEY], {});
        navigate('/auth/signin', { replace: true });
    };

    return {
        loginMutation,
        registerMutation,
        authQuery,
        setLogout,
    };
};
