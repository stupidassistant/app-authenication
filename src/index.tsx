import * as React from "react";
import * as firebase from 'firebase';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const authDomain: string = "https://account.stupidassistant.com/token";
const redirect_url: string = `${window.location.origin}/handleAuthToken`;

type Props = {
  auth: firebase.auth.Auth;
  component: JSX.Element;
};

type State = {
  signedIn: boolean|null,
};

export default class ExampleComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      signedIn: null
    };
  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user: firebase.User|null) => {
      const signedIn: boolean = user !== null;
      if (signedIn != this.state.signedIn) {
        this.setState({
          signedIn
        });
      }
    })
  }

  render() {
    const { signedIn } = this.state;
    const { component } = this.props;

    console.log("IS SIGNED IN ", signedIn)

    if (signedIn == false) {
      return (
        <Router>
          <Switch>
            <Route path='/handleAuthToken' component={() => {
              const params = new URLSearchParams(window.location.search);
              const auth_token: string|null = params.get('auth_token');

              if (auth_token)
                this.props.auth.signInWithCustomToken(auth_token);

              return null;
            }}/>
            <Route path='/' component={() => { 
              window.location.replace(`${authDomain}?redirect_to=${redirect_url}`);
              return null;
            }}/>
          </Switch>
        </Router>
      );
    } else if (signedIn == true) {
      return component;
    }
    return null;
  }
};