/*SignUp index.js*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

/*<FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer>*/

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordUno: '',
    passwordDos: '',
    isAdmin: false,
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordUno, isAdmin } = this.state;
        const roles = {};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
        this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordUno)
            .then(authUser => {
                //creates a user in the firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                    });
            })
            .then(() => {
            this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {
        const {
            username,
            email,
            passwordUno,
            passwordDos,
            isAdmin,
            error,
        } = this.state;

        const isInvalid = passwordUno !== passwordDos ||
            passwordUno === '' ||
            passwordDos === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordUno"
                    value={passwordUno}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordDos"
                    value={passwordDos}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                <button disabled={isInvalid} type="submit">Sign Up</button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account nerd? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

//const SignUpForm = withRouter(withFirebase(SignUpFormBase)); //to setup navigation to another form after a user has signed up, like the home page, without using the recompose module

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };