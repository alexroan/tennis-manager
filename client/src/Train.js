import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dropdown, Row, Col, Card, ListGroup, ListGroupItem, Button, Spinner} from 'react-bootstrap';
import { selectTrainableAttribute, loadTrainingCosts, restPlayer } from './redux/interactions';
import { selectedPlayerDetailsSelector, selectedPlayerIdSelector, selectedTrainableAttributeNameSelector, conditionCostToTrainSelector, xpCostToTrainSelector, xpCostToRestSelector, conditionGainOnRestSelector, attributeGainSelector, tennisPlayerSelector, tennisPlayerLoadedSelector, selectedTrainableAttributeIdSelector, accountSelector, isTrainingSelector, isRestingSelector } from './redux/selectors';
import getColourClass from './helpers';
import {trainPlayer} from './redux/interactions';

const attributeSelected = (dispatch, name, id) => {
    selectTrainableAttribute(dispatch, name, id);
}

const printAttributeCost = (name, current, cost) => {
    let newValue = current - cost;
    if (current === undefined) {
        return "";
    }
    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            {name}
            <span className={getColourClass(current)}>{current}</span>
            >
            <span className={getColourClass(newValue)}>{newValue}</span>
        </ListGroupItem>
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
        current = playerDetails.stamina;
    }
    else if (attributeName === "Technique") {
        current = playerDetails.technique;
    }
    else if (attributeName === "Condition") {
        current = playerDetails.condition;
    }
    newValue = parseInt(current) + parseInt(gain);
    if (isNaN(newValue)) {
        return "";
    }
    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            {attributeName}
            <span className={getColourClass(current)}>{current}</span>
            >
            <span className={getColourClass(newValue)}>{newValue}</span>
        </ListGroupItem>
    );
}

const trainThePlayer = (dispatch, tennisPlayer, playerId, attributeId, account, e) => {
    e.preventDefault();
    trainPlayer(dispatch, tennisPlayer, playerId, attributeId, account);
}

const restThePlayer = (dispatch, tennisPlayer, playerId, account, e) => {
    e.preventDefault();
    restPlayer(dispatch, tennisPlayer, playerId, account);
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
            playerId,
            selectedTrainableAttributeName,
            selectedTrainableAttributeId,
            xpCostToTrain,
            attributeGain,
            conditionCostToTrain,
            tennisPlayer,
            xpCostToRest,
            conditionGainOnRest,
            account,
            isTraining,
            isResting
        } = this.props
        let isDisabled = playerDetails === false;
        return (
            <Row>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            Trainer
                        </Card.Header>
                        <Card.Body>
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
                        </Card.Body>
                        <ListGroup>
                            {printAttributeCost("XP", playerDetails.xp, xpCostToTrain)}
                            {printAttributeCost("Condition", playerDetails.condition, conditionCostToTrain)}
                            {printAttributeGain(selectedTrainableAttributeName, playerDetails, attributeGain)}
                        </ListGroup>
                        <Card.Body>
                            <form onSubmit={(e) => trainThePlayer(dispatch, tennisPlayer, playerId, selectedTrainableAttributeId, account, e)}>
                                <div className="input-group input-group-sm mb-3">
                                    <Button className="form-control" type="submit">
                                        {isTraining ? <><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Training...</> : <>Train</>}
                                    </Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <Card.Header>
                            Rest
                        </Card.Header>
                        <ListGroup>
                            {printAttributeCost("XP", playerDetails.xp, xpCostToRest)}
                            {printAttributeGain("Condition", playerDetails, conditionGainOnRest)}
                        </ListGroup>
                        <Card.Body>
                            <form onSubmit={(e) => restThePlayer(dispatch, tennisPlayer, playerId, account, e)}>
                                <div className="input-group input-group-sm mb-3">
                                    <Button className="form-control" type="submit">
                                        {isResting ? <><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Resting...</> : <>Rest</>}
                                    </Button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state){
	return {
        account: accountSelector(state),
        playerDetails: selectedPlayerDetailsSelector(state),
        playerId: selectedPlayerIdSelector(state),
        tennisPlayerLoaded: tennisPlayerLoadedSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        selectedTrainableAttributeName: selectedTrainableAttributeNameSelector(state),
        selectedTrainableAttributeId: selectedTrainableAttributeIdSelector(state),
        conditionCostToTrain: conditionCostToTrainSelector(state),
        xpCostToTrain: xpCostToTrainSelector(state),
        attributeGain: attributeGainSelector(state),
        xpCostToRest: xpCostToRestSelector(state),
        conditionGainOnRest: conditionGainOnRestSelector(state),
        isTraining: isTrainingSelector(state),
        isResting: isRestingSelector(state)
	}
}

export default connect(mapStateToProps)(Train);