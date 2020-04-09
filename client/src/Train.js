import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap';
import { selectTrainableAttribute, loadTrainingCosts } from './redux/interactions';
import { selectedPlayerDetailsSelector, selectedTrainableAttributeNameSelector, conditionCostToTrainSelector, xpCostToTrainSelector, xpCostToRestSelector, conditionGainOnRestSelector, attributeGainSelector, tennisPlayerSelector, tennisPlayerLoadedSelector } from './redux/selectors';
import getColourClass from './helpers';

const attributeSelected = (dispatch, name, id) => {
    selectTrainableAttribute(dispatch, name, id);
}

const printAttributeCost = (name, current, cost) => {
    let newValue = current - cost;
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {name}
            <span className={getColourClass(current)}>{current}</span>
            >
            <span className={getColourClass(newValue)}>{newValue}</span>
        </li>
    );
}

const printAttributeGain = (attributeName, playerDetails, gain) => {
    let current, newValue;
    if (attributeName === "Agility") {
        current = playerDetails.agility;
    }
    else if (attributeName === "Power") {
        current = playerDetails.power;
    }
    else if (attributeName === "Stamina") {
        current = playerDetails.agility;
    }
    else if (attributeName === "Technique") {
        current = playerDetails.agility;
    }
    newValue = parseInt(current) + parseInt(gain);
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            {attributeName}
            <span className={getColourClass(current)}>{current}</span>
            >
            <span className={getColourClass(newValue)}>{newValue}</span>
        </li>
    );
}

class Train extends Component {

    componentDidMount() {
        const {dispatch, tennisPlayer, tennisPlayerLoaded} = this.props;
        if(tennisPlayerLoaded) {
            loadTrainingCosts(dispatch, tennisPlayer);
        }
    }

    render() {
        const {dispatch, 
            playerDetails, 
            selectedTrainableAttributeName,
            xpCostToTrain,
            attributeGain,
            conditionCostToTrain
        } = this.props
        let isDisabled = playerDetails === false;
        return (
            <div className="card">
                <div className="card-header">
                    Trainer
                </div>
                <div className="card-body">
                    <Dropdown>
                        <Dropdown.Toggle disabled={isDisabled} size="sm">
                            {selectedTrainableAttributeName == null ? "Attribute" : selectedTrainableAttributeName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item key={0} onClick={(e) => attributeSelected(dispatch, "Agility", 0)} >Agility</Dropdown.Item>
                            <Dropdown.Item key={1} onClick={(e) => attributeSelected(dispatch, "Power", 1)} >Power</Dropdown.Item>
                            <Dropdown.Item key={2} onClick={(e) => attributeSelected(dispatch, "Stamina", 2)} >Stamina</Dropdown.Item>
                            <Dropdown.Item key={3} onClick={(e) => attributeSelected(dispatch, "Technique", 3)} >Technique</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="card-body">
                <ul className="list-group">
                    {printAttributeCost("XP", playerDetails.xp, xpCostToTrain)}
                    {printAttributeCost("Condition", playerDetails.condition, conditionCostToTrain)}
                    {printAttributeGain(selectedTrainableAttributeName, playerDetails, attributeGain)}
                </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
        playerDetails: selectedPlayerDetailsSelector(state),
        tennisPlayerLoaded: tennisPlayerLoadedSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        selectedTrainableAttributeName: selectedTrainableAttributeNameSelector(state),
        conditionCostToTrain: conditionCostToTrainSelector(state),
        xpCostToTrain: xpCostToTrainSelector(state),
        attributeGain: attributeGainSelector(state),
        xpCostToRest: xpCostToRestSelector(state),
        conditionGainOnRest: conditionGainOnRestSelector(state)
	}
}

export default connect(mapStateToProps)(Train);