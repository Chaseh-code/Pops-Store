/*Home index.js*/
import React from 'react';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

const HomePage = () => (
    <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
    </div>
);

//const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);