/*Admin index.js*/
import React, { Component } from 'react';
import {compose} from 'recompose';
import { withFirebase } from '../Firebase';
import {withAuthorization} from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            console.log(usersObject);
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            console.log(usersList);
            this.setState({
                users: usersList,
                loading: false,
            });
            console.log("Testing state");
            console.log(this.state.users);
        });

    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                <h1>Admin</h1>
                <p>
                    The Admin Page is a secrect organization that was created to protect all those that had come before, those that had just arrived, and those that have yet to come.
                </p>
                {loading && <div>Loading...</div>}
                <UserList users={users} />
            </div>
        );
    }

}

const UserList = ({ users }) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                <span>
                    <strong>ID: </strong> {user.uid}
                </span>
                <span>
                    <strong> E-Mail: </strong> {user.email}
                </span>
                <span>
                    <strong> Username: </strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
);

const condition = authUser => 
            authUser && !!authUser.roles[ROLES.ADMIN];

//export default withFirebase(AdminPage);
export default compose(
    withAuthorization(condition),
    withFirebase,
)(AdminPage);