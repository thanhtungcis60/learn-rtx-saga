import * as React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

type Props = { children: React.ReactElement };
export function PrivateRoute({ children }: Props) {
  //Check if user is logged in
  //If yes, show route
  //Otherwise redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
