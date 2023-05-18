import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import isAuthenticated from './auth';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const history = useHistory();

    useEffect(() => {
      if (!isAuthenticated()) {
        history.push('/');
      }
    }, [history]);

    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;






