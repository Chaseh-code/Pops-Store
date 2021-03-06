/*Navigation index.js*/
import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
    <div><AuthUserContext.Consumer>{authUser => authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}</AuthUserContext.Consumer></div>  
);


const NavigationAuth = ({authUser}) => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
        <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        )}
        
        <li>
            <SignOutButton />
        </li>
    </ul>
);
/*const NavigationAuth = ({authUser}) => (
    <ul>
        <li>
        <span>
            <Link to={ROUTES.LANDING}> Landing </Link>
        </span>
        <span>
            <Link to={ROUTES.HOME}> Home </Link>
        </span>
        <span>
            <Link to={ROUTES.ACCOUNT}> Account </Link>
        </span>
        {!!authUser.roles[ROLES.ADMIN] && (
        <span>
            <Link to={ROUTES.ADMIN}> Admin </Link>
        </span>
        )}
        <span>
            <SignOutButton />
        </span>
        </li>
    </ul>
);*/


const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
    </ul>
);

/*const Navigation = () => ( // A standard navigation setup. Does not deal with authorized logged in users.
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);*/

export default Navigation;