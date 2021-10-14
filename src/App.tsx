import { AuthProvider } from 'contexts/auth';
import React from 'react';
import { Router } from 'react-router';
import history from 'utils/history';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;