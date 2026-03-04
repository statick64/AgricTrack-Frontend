import { useState, useEffect, useCallback } from 'react';

interface UseApiResult<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Generic hook for fetching data from the API.
 * Automatically fetches on mount and whenever `deps` change.
 *
 * @param fetchFn - An async function that returns the data
 * @param deps - Optional dependency array to trigger re-fetch
 */
export function useApi<T>(
    fetchFn: () => Promise<T>,
    deps: any[] = []
): UseApiResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchFn();
            setData(result);
        } catch (err: any) {
            const message =
                err.response?.data?.error ||
                err.response?.data?.detail ||
                err.message ||
                'An error occurred while fetching data.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, isLoading, error, refetch };
}
