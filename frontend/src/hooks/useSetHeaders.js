import useLocalStorage from './useLocalstorage';

const useSetHeaders = (headers) => {
  const token = useLocalStorage('get')('token');
  headers.set('Authorization', `Bearer ${token}`);
  return headers;
};

export default useSetHeaders;
