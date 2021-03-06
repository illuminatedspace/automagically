import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {auth} from 'APP/db/firebase'
import {browserHistory} from 'react-router'
import {provider, fProvider} from '../../db/firebase'

class OAuth extends Component {
  constructor () {
    super()

    this.googleLogin = this.googleLogin.bind(this)
  }

  googleLogin () {
    auth
    .signInWithRedirect(provider)
    .then((result) => {
      // This gives you a Google Access Token.
      let token = result.credential.accessToken
      let user = result.user
      browserHistory.push('/timeline')
    }).catch((error) => {
      console.error(error.code, error.message, error.email, error.credential)
    });
  }

  facebookLogin () {
    auth
    .signInWithRedirect(fProvider)
    .then((result) => {
      // This gives you a Facebook Access Token.
      var token = result.credential.accessToken
      var user = result.user
      browserHistory.push('/timeline')
    }).catch((error) => {
      console.error(error.code, error.message, error.email, error.credential)
    });
  }

  render () {
    return (
      <div>
        <Button type="submit" value="Login with Google" onClick={this.googleLogin}>
          Log In with Google
        </Button>
        <Button type="submit" value="Login with Facebook" onClick={this.facebookLogin}>
          Log In with Facebook
        </Button>
      </div>
    )
 }
}

export default OAuth
