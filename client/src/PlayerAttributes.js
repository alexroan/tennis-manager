import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { selectedPlayerDetailsSelector } from './redux/selectors';
import getColourClass from './helpers';

const getPlayerAttributes = (props) => {
    const {playerDetails} = props;
    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Condition
                <span className={getColourClass(playerDetails.condition)}>{playerDetails.condition}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Agility
                <span className={getColourClass(playerDetails.agility)}>{playerDetails.agility}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Power
                <span className={getColourClass(playerDetails.power)}>{playerDetails.power}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Stamina
                <span className={getColourClass(playerDetails.stamina)}>{playerDetails.stamina}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Technique
                <span className={getColourClass(playerDetails.technique)}>{playerDetails.technique}</span>
            </li>
        </ul>
    );
}

class PlayerAttributes extends Component {
    render() {
        return (
            <Card>
                <Card.Header>
                    Attributes
                </Card.Header>
                {this.props.playerDetails ? getPlayerAttributes(this.props) : <p>No Details</p>}
            </Card>
        );
    }
}

function mapStateToProps(state){
	return {
        playerDetails: selectedPlayerDetailsSelector(state)
	}
}

export default connect(mapStateToProps)(PlayerAttributes);