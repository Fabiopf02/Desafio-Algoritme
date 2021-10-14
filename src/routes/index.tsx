import { AuthContext } from 'contexts/auth';
import React, { useContext } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <React.Fragment />;
  }

  if (signed) {
    return <AppRoutes />
  }

  return <AuthRoutes />
}

export default Routes;