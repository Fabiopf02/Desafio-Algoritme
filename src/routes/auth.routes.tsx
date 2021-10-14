import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Logon from 'pages/Logon';
import Register from 'pages/Register';

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Logon} />
        <Route path="/register" component={Register} />
        <Redirect from="*" to="/login" />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
