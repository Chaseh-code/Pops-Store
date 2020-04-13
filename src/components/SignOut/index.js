/*SignOut index.js*/
import React from 'react';
import { withFirebase } from '../Firebase';

/*const SignOut = () => (
    <div>
        <h1>SignOut</h1>
    </div>
);*/

const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);