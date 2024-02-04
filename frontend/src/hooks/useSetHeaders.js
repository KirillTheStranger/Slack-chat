import useGetToken from './useGetToken';

const useSetHeaders = (headers) => {
  const token = useGetToken();
  headers.set('Authorization', `Bearer ${token}`);
  return headers;
};

export default useSetHeaders;
