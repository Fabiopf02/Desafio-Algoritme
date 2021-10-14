import Dashboard from 'pages/Dashboard';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" exact component={Dashboard} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
