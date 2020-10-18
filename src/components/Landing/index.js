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
const imgStyle = { //trying to resize the images for the inventory
    width: '300px',
    height: '300px',
};

const bannerStyle = {
    width: '100%',
    height: '100%',
};
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
            console.log(this.state.inventory[0].uid);
        });
    }

    componentWillUnmount() {
        this.props.firebase.loadinventory().off();
    }

    render() {
        const { inventory } = this.state;
        return(
            <div className="landing">
                <div className="landing-poster">
                    <img style={bannerStyle} src={require('./creature-main.jpg')}alt="Creature From The Black Lagoon"/>
                </div>
                <h1><strong>Inventory Part</strong></h1>
                <InventoryList inventory={inventory} />
                <div className="landing-footer">
                    <h2>We sell originals and replicas. Contact me if you are interested in anything specific!</h2>
                    <div>
                        <h3>Terms & Conditions may apply.</h3>
                        <h3>Stupidity voids all warranties</h3>
                    </div>
                </div>
            </div>
        );        
    }
}
/* Rename all the pictures used for the photos to the uid in firebase realtime database */
const InventoryList = ({inventory}) => (
    <div>
        <ul>
            {inventory.map(item => (
                <li className="inventory-line" key={item.uid}>
                    <img style={imgStyle} src={require(`../../images/${item.uid}.jpg`)} alt="food" />
                    <li>
                        <span>
                            <strong></strong> {item.uid}
                        </span>
                        <span>
                            <strong></strong> {item.description}
                        </span>
                        <span>
                            <strong></strong> {item.item}
                        </span>
                        <span>
                            <strong></strong> {item.dimensions}
                        </span>
                        <span>
                            <strong></strong> {item.price}
                        </span>
                        <span>
                            <strong> Qty </strong> {item.quantity}
                        </span>
                    </li>
                </li>
            ))}
        </ul>
    </div>
);

const item = ({inventory}) => {

};
/*const test = compose(
    withFirebase,)(Inventory);
export default Landing;
export {test};*/
export default withFirebase(Inventory);