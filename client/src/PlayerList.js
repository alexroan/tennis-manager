import React, {Component} from 'react';
import {connect} from 'react-redux';
import { tennisPlayerSelector, accountLoadedSelector, gameLoadedSelector, tennisPlayerLoadedSelector, accountSelector, ownedPlayersSelector, newPlayerNameSelector, newPlayerAgeSelector, newPlayerHeightSelector, gameSelector } from './redux/selectors';
import { newPlayerNameChange, newPlayerAgeChange, newPlayerHeightChange} from "./redux/actions";
import { createNewPlayer, loadSelectedPlayer } from './redux/interactions';

const playerSelected = (props, id) => {
    console.log(id);
    const {dispatch, tennisPlayer} = props;
    loadSelectedPlayer(dispatch, tennisPlayer, id);
}

const getOwnedPlayers = (props) => {
    const {ownedPlayers} = props;
    return ownedPlayers.map((id) => 
        <a href="/" onClick={playerSelected(props, id)} key={id} className="list-group-item">{id}</a>
    );
}

class PlayerList extends Component {
    render() {

        const {dispatch, game, account, newPlayerName, newPlayerAge, newPlayerHeight} = this.props;

        const newPlayer = async (e) => {
            e.preventDefault();
            console.log(newPlayerName, newPlayerAge, newPlayerHeight);
            await createNewPlayer(dispatch, game, account, newPlayerName, newPlayerAge, newPlayerHeight);
        }

        const nameChange = (e) => dispatch(newPlayerNameChange(e.target.value));
        const ageChange = (e) => dispatch(newPlayerAgeChange(e.target.value));
        const heightChange = (e) => dispatch(newPlayerHeightChange(e.target.value));

        return (
            <div className="col-4">
                <div className="card">
                    <div className="card-header">
                        Player List
                    </div>
                    <div className="list-group list-group-flush">
                        {this.props.showOwnedPlayers ? getOwnedPlayers(this.props) : <a className="list-group-item">No Players</a>}
                    </div>
                    <div className="card-body">
                        Create New Player
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
                            <div className="input-group input-group-sm mb-3">
                                <input type="submit" className="form-control btn btn-primary btn-sm" aria-label="Submit" aria-describedby="inputGroup-sizing-sm"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
        newPlayerHeight: newPlayerHeightSelector(state)
	}
}

export default connect(mapStateToProps)(PlayerList);