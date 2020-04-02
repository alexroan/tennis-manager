import React, {Component} from 'react';
import {connect} from 'react-redux';
import { selectedPlayerDetailsSelector } from './redux/selectors';

const getPlayerDetails = (props) => {
    const {playerDetails} = props;
    return (
        <ul className="list-group list-group-flush">
            <li key="xp" className="list-group-item">{playerDetails.xp}</li>
            <li key="name" className="list-group-item">{playerDetails.name}</li>
            <li key="age" className="list-group-item">{playerDetails.age}</li>
            <li key="height" className="list-group-item">{playerDetails.height}</li>
            <li key="condition" className="list-group-item">{playerDetails.condition}</li>
            <li key="agility" className="list-group-item">{playerDetails.agility}</li>
            <li key="power" className="list-group-item">{playerDetails.power}</li>
            <li key="stamina" className="list-group-item">{playerDetails.stamina}</li>
            <li key="technique" className="list-group-item">{playerDetails.technique}</li>
        </ul>
    );
}

class PlayerDetails extends Component {
    render() {
        return (
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        Player Details
                    </div>
                    {this.props.playerDetails ? getPlayerDetails(this.props) : <p>No Details</p>}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
	return {
        playerDetails: selectedPlayerDetailsSelector(state)
	}
}

export default connect(mapStateToProps)(PlayerDetails);