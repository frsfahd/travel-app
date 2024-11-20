// PrivateRoutes.js
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './Auth';
import Loader from '../common/Loader';

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const isVerified = await auth.verify();
      setIsAuthorized(isVerified);
      setIsLoading(false);
    };

    verifyToken();
  }, [auth]);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoutes;
