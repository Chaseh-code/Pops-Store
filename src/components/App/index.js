/*App index.js*/
import React, { Component } from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import { withAuthentication } from '../Session';
//import { withFirebase } from '../Firebase';
//import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';

const mediaStyle = {
    width: "100%",
    height: "100%",
};

const App = () => (
    <Router>
        <div>
            <div className="navi-bar">
                <div >
                    <Navigation />
                </div>
                <div className="social-media">
                    <a role="button" href="https://www.facebook.com/creaturefeaturefanatic/" target="_blank">
                        <img style={mediaStyle} src={require('../../images/facebook-icon.jpg')} alt="Social Media link"/>
                    </a>
                </div>
            </div>
            <hr />
            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
    </Router>
);

/*class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
        });
    }

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
                <Router>
                    <div>
                        <Navigation/>
                        <hr />
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </div>
                </Router>
    );
}

}*/

//export default withFirebase(App);
export default withAuthentication(App);