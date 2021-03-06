import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../providers/Auth'
import { useConfig } from '../../providers/Config'

function AuthorizedRoute({ component: Component, redirectTo , ...rest }) {
  const { appConfig } = useConfig()
  const { auth: authConfig } = appConfig || {}
  const { signInURL = '/signin' } = authConfig || {}
  const { auth } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          redirectTo?
          <Redirect
            to={{
              pathname: redirectTo,
              search: `from=${props.location.pathname}`,
              state: { from: props.location },
            }}
          />
          :
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: signInURL,
              search: `from=${props.location.pathname}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default AuthorizedRoute
