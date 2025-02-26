import { AxiosInstance } from 'axios';
import { QueryClient, QueryFunctionContext, QueryKey } from 'react-query';
import { isString } from 'shared/utils/type-guards';

const createReactQueryTestClient = (
  axios: AxiosInstance,
  baseUrl: string
): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        queryFn: async <T,>({
          queryKey: [url],
        }: QueryFunctionContext<QueryKey, unknown[]>): Promise<T> => {
          if (isString(url)) {
            const { data } = await axios.get<T>(
              `${baseUrl}${url.toLowerCase()}`
            );
            return data;
          }
          throw new Error(`Invalid QueryKey: '${String(url)}'`);
        },
      },
    },
  });

export default createReactQueryTestClient;
