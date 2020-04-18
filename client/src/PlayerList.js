import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Nav} from 'react-bootstrap';
import { tennisPlayerSelector, accountLoadedSelector, gameLoadedSelector, tennisPlayerLoadedSelector, accountSelector, ownedPlayersSelector, newPlayerNameSelector, newPlayerAgeSelector, newPlayerHeightSelector, gameSelector, showNewPlayerModalSelector } from './redux/selectors';
import { newPlayerNameChange, newPlayerAgeChange, newPlayerHeightChange, newPlayerModalShow} from "./redux/actions";
import { createNewPlayer, loadSelectedPlayer } from './redux/interactions';

const playerSelected = (props, id, e) => {
    e.preventDefault();
    console.log(id);
    const {dispatch, tennisPlayer} = props;
    loadSelectedPlayer(dispatch, tennisPlayer, id);
}

const getOwnedPlayers = (props) => {
    const {ownedPlayers} = props;
    return ownedPlayers.map((id) => 
        <Nav.Item>
            <Nav.Link onClick={(e) => {playerSelected(props, id, e)}} key={id}>
                Player ID: {id}
            </Nav.Link>
        </Nav.Item>
    );
}

class PlayerList extends Component {
    render() {

        const {dispatch, game, account, newPlayerName, newPlayerAge, newPlayerHeight, showModal} = this.props;

        const newPlayer = async (e) => {
            e.preventDefault();
            console.log(newPlayerName, newPlayerAge, newPlayerHeight);
            await createNewPlayer(dispatch, game, account, newPlayerName, newPlayerAge, newPlayerHeight);
            closeModal();
        }

        const nameChange = (e) => dispatch(newPlayerNameChange(e.target.value));
        const ageChange = (e) => dispatch(newPlayerAgeChange(e.target.value));
        const heightChange = (e) => dispatch(newPlayerHeightChange(e.target.value));

        const openModal = () => dispatch(newPlayerModalShow(true));
        const closeModal = () => dispatch(newPlayerModalShow(false));

        return (
            <>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={newPlayer}>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                                </div>
                                <input onChange={nameChange} required name="name" type="text" className="form-control" aria-label="Name" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Age</span>
                                </div>
                                <input onChange={ageChange} required name="age" type="number" min="15" max="40" className="form-control" aria-label="Age" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-sm">Height (cm)</span>
                                </div>
                                <input onChange={heightChange} required name="height" type="number" min="100" max="255" className="form-control" aria-label="Height" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={newPlayer}>
                            Create Player
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="col-3">
                    <h4>Player List</h4>
                    <Nav className="flex-column">
                        {this.props.showOwnedPlayers ? getOwnedPlayers(this.props) : <></>}
                    </Nav>
                    <Button variant="primary" onClick={openModal}>
                        Create New Player
                    </Button>
                </div>
            </>
        )
    }
}

function mapStateToProps(state){
    const accountLoaded = accountLoadedSelector(state);
    const gameLoaded = gameLoadedSelector(state);
    const tennisPlayerLoaded = tennisPlayerLoadedSelector(state);
	return {
        showOwnedPlayers: accountLoaded && gameLoaded && tennisPlayerLoaded,
        game: gameSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        account: accountSelector(state),
        ownedPlayers: ownedPlayersSelector(state),
        newPlayerName: newPlayerNameSelector(state),
        newPlayerAge: newPlayerAgeSelector(state),
        newPlayerHeight: newPlayerHeightSelector(state),
        showModal: showNewPlayerModalSelector(state)
	}
}

export default connect(mapStateToProps)(PlayerList);