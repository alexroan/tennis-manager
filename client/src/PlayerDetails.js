import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'react-bootstrap';
import { selectedPlayerDetailsSelector } from './redux/selectors';
import getColourClass from './helpers';

const getPlayerDetails = (props) => {
    const {playerDetails} = props;
    return (
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                XP
                <span className={getColourClass(playerDetails.xp)}>{playerDetails.xp}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Name
                <span className="text-right">{playerDetails.name}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Age
                <span className="text-right">{playerDetails.age}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Height (cm)
                <span className="text-right">{playerDetails.height}</span>
            </li>
        </ul>
    );
}

class PlayerDetails extends Component {
    render() {
        return (
            <Card>
                <Card.Header>
                    Details
                </Card.Header>
                {this.props.playerDetails ? getPlayerDetails(this.props) : <p>No Details</p>}
            </Card>
        );
    }
}

function mapStateToProps(state){
	return {
        playerDetails: selectedPlayerDetailsSelector(state)
	}
}

export default connect(mapStateToProps)(PlayerDetails);