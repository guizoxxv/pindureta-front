import React, { useContext } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { AuthContext } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { data } = useContext(AuthContext);
  
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === Boolean(data.user) ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
