import { Navigate } from 'react-router-dom';
import { StorageKey } from '../shared/constants';
import { getLocalStorage } from '../shared/utils';

type RouteProviderProps = {
  children: React.ReactNode;
};

const RouteProvider = ({ children }: RouteProviderProps) => {
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }
  return <>{children}</>;
};

export default RouteProvider;
