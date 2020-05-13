import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Button, Form, Spinner, Modal} from 'react-bootstrap';
import { tennisPlayerSelector, selectedPlayerIdSelector, accountSelector, isEnlistedSelector, opponentIdSelector, playingMatchSelector, showResultSelector, matchResultSelector } from './redux/selectors';
import { enlistToCompete, delistToCompete, opponentIdChanged, playMatch, closeResultModal } from './redux/interactions';

const enlistPlayer = (props, e) => {
    e.preventDefault();
    const {dispatch, tennisPlayer, playerId, account} = props;
    enlistToCompete(dispatch, tennisPlayer, playerId, account);
}

const delistPlayer = (props, e) => {
    e.preventDefault();
    const {dispatch, tennisPlayer, playerId, account} = props;
    delistToCompete(dispatch, tennisPlayer, playerId, account);
}

const changeOpponentId = (props, e) => {
    const {dispatch} = props;
    opponentIdChanged(dispatch, e.target.value);
}

const beginMatch = (props, e) => {
    e.preventDefault();
    const {dispatch, tennisPlayer, playerId, account, opponentId} = props;
    playMatch(dispatch, tennisPlayer, playerId, account, opponentId);
}

const playForm = (props) => {
    return (
        <Form onSubmit={(e) => beginMatch(props, e)}>
            <Form.Group>
                <Form.Label>
                    Opponent ID
                </Form.Label>
                <Form.Control onChange={(e) => changeOpponentId(props, e)} type="number" min="0" />
            </Form.Group>
            <Button type="submit">
                Play Match!
            </Button>
        </Form>
    );
}

class Compete extends Component {

    
    render() {    
        const {dispatch, isEnlisted, playingMatch, showResult, matchResult} = this.props;

        const closeModal = () => closeResultModal(dispatch);

        if (!isEnlisted) {
            return (
                <Card>
                    <Card.Header>
                        Enlist To Compete
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={(e) => enlistPlayer(this.props, e)}>
                            <Button type="submit">
                                Enlist
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )
        }
        else {
            return (
                <>
                    <Card>
                        <Card.Header>
                            Enlisted
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={(e) => delistPlayer(this.props, e)}>
                                <Button type="submit">
                                    Delist
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Header>
                            Play Match
                        </Card.Header>
                        <Card.Body>
                            {playingMatch ? <Spinner animation="border" /> : playForm(this.props)}
                        </Card.Body>
                    </Card>
                    <Modal show={showResult} onHide={closeModal}>
                        <Modal.Header>{matchResult}</Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
        }
    }
}

function mapStateToProps(state){
	return {
        isEnlisted: isEnlistedSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        playerId: selectedPlayerIdSelector(state),
        account: accountSelector(state),
        opponentId: opponentIdSelector(state),
        playingMatch: playingMatchSelector(state),
        showResult: showResultSelector(state),
        matchResult: matchResultSelector(state)
	}
}

export default connect(mapStateToProps)(Compete);