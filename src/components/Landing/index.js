/*Landing index.js*/
import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const Landing = () => (
    <div className="landing">
        <div>
            <h4><a href="https://www.facebook.com/">Contact me on facebook</a></h4>
        </div>
        <div >
            <Inventory />
        </div>
        
    </div>
);  

class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            inventory: [{}],
        };
    }

    componentDidMount() { //not pulling data from the database correctly.
        /*this.props.firebase.users().once('value')
        .then((snapshot) => {
            const temp = snapshot.val();
            console.log(temp);
        });*/

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            console.log(usersObject);
            
        });
    }

    render() {
        return(
            <div>
                <h1><strong>Inventory Part</strong></h1>
            </div>
        );        
    }
}

const test = compose(
    withFirebase,)(Inventory);
export default Landing;
export {test};