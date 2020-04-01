import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadWeb3, loadWallet, loadGameContract, loadTennisPlayerContract, loadOwnedPlayers } from './redux/interactions';
import { web3Selector, accountSelector, gameSelector, tennisPlayerSelector } from './redux/selectors';

class Connections extends Component {
    render() {
        const {dispatch, web3, account, game, tennisPlayer} = this.props;

        const connectBlockchain = async (e) => {
            e.preventDefault();
            await loadWeb3(dispatch);
        }
        
        const connectGame = async (e) => {
            e.preventDefault();
            const gameContract = await loadGameContract(dispatch, web3);
            await loadTennisPlayerContract(dispatch, web3, gameContract);
        }

        const connectWallet = async (e) => {
            e.preventDefault();
            const account = await loadWallet(dispatch, web3);
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
        }

        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectBlockchain}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(web3 !== null) ? "disabled btn-success" : "btn-danger"}`}>
                                        {(web3 !== null) ? "Blockchain Connected" : "Connect Blockchain"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <form onSubmit={connectGame}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(web3 === null) ? "disabled btn-danger" : (game !== null) ? "disabled btn-success" : "btn-warning" }`}>
                                        {(game !== null) ? "Game Ready" : "Connect Game"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4">
                        <form onSubmit={connectWallet}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(game === null) ? "disabled btn-danger" : (account !== null) ? "btn-success" : "btn-warning" }`}>
                                        {(account !== null) ? account : "Connect Wallet"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
	return {
        web3: web3Selector(state),
        account: accountSelector(state),
        game: gameSelector(state),
        tennisPlayer: tennisPlayerSelector(state)
	}
}

export default connect(mapStateToProps)(Connections);