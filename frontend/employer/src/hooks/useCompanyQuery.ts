import useBackendAPI from 'employer/hooks/useBackendAPI';
import Company from 'employer/types/company';
import { useQuery, UseQueryResult } from 'react-query';

export const COMPANY_URL = '/v1/company/';

const useCompanyQuery = (): UseQueryResult<Company, Error> => {
  const { axios } = useBackendAPI();
  return useQuery<Company, Error>('company', async () => {
    const { data } = await axios.get<Company>(COMPANY_URL);
    return data;
  });
};
export default useCompanyQuery;
