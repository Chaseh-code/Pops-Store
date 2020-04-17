/*Landing index.js*/
import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

/*const Landing = () => (
    <div className="landing">
        <div>
            <h4><a href="https://www.facebook.com/">Contact me on facebook</a></h4>
        </div>
        <Inventory />
        
    </div>
);*/  

class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            inventory: [],
        };
    }

    componentDidMount() { //not pulling data from the database correctly.
        this.props.firebase.loadinventory().on('value', snapshot => {
            const invObj = snapshot.val();
            console.log(invObj);
            const invList = Object.keys(invObj).map(key => ({
                ...invObj[key],
                uid: key,
            }));
            console.log(invList);
            this.setState({
                inventory: invList,
            });
            console.log("testing inv state");
            console.log(this.state.inventory);
        });
    }

    componentWillUnmount() {
        this.props.firebase.loadinventory().off();
    }

    render() {
        const { inventory } = this.state;
        return(
            <div className="landing">
                <div >
                    <h4><a href="https://www.facebook.com/">Contact me on facebook</a></h4>
                </div>
                <h1><strong>Inventory Part</strong></h1>
                <InventoryList inventory={inventory} />
            </div>
        );        
    }
}

const InventoryList = ({inventory}) => (
    <ul>
        {inventory.map(item => (
            <li key={item.uid}>
                <span>
                    <strong>Unique Id: </strong> {item.uid}
                </span>
                <span>
                    <strong> Description: </strong> {item.description}
                </span>
                <span>
                    <strong> Item Name: </strong> {item.item}
                </span>
                <span>
                    <strong> Item dimensions: </strong> {item.dimensions}
                </span>
                <span>
                    <strong> Price: </strong> {item.price}
                </span>
                <span>
                    <strong> Quantity: </strong> {item.quantity}
                </span>
            </li>
        ))}
    </ul>
);

/*const test = compose(
    withFirebase,)(Inventory);
export default Landing;
export {test};*/
export default withFirebase(Inventory);