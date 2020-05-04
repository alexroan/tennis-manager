import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadWeb3, loadGameContract, loadTennisPlayerContract, loadWalletDetails, loadTrainingCosts, loadWeb3Socket, loadTennisPlayerSocket } from './redux/interactions';
import { web3Selector, accountSelector, gameSelector, tennisPlayerSelector, web3SocketSelector, tennisPlayerSocketSelector } from './redux/selectors';

const preventDefaultIfNeeded = async (e) => {
    if (!e.defaultPrevented) {
        e.preventDefault();
    }
}

class Connections extends Component {
    render() {
        const {dispatch, web3, web3Socket, account, game, tennisPlayer, tennisPlayerSocket} = this.props;

        const connectBlockchain = async (e) => {
            preventDefaultIfNeeded(e);
            const web3 = await loadWeb3(dispatch);
            await loadWeb3Socket(dispatch, web3);
        }
        
        const connectGame = async (e) => {
            preventDefaultIfNeeded(e);
            const gameContract = await loadGameContract(dispatch, web3);
            const tennisPlayer = await loadTennisPlayerContract(dispatch, web3, gameContract);
            const tennisPlayerSocket = await loadTennisPlayerSocket(dispatch, web3Socket, gameContract);
            await loadTrainingCosts(dispatch, tennisPlayer);
        }

        const connectWallet = async (e) => {
            preventDefaultIfNeeded(e);
            await loadWalletDetails(dispatch, web3, web3Socket, tennisPlayer, tennisPlayerSocket);
        }

        const connectAll = async (e) => {
            e.preventDefault();
            const web3 = await loadWeb3(dispatch);
            const web3Socket = await loadWeb3Socket(dispatch, web3);
            const gameContract = await loadGameContract(dispatch, web3);
            const tennisPlayer = await loadTennisPlayerContract(dispatch, web3, gameContract);
            const tennisPlayerSocket = await loadTennisPlayerSocket(dispatch, web3Socket, gameContract);
            await loadTrainingCosts(dispatch, tennisPlayer);
            await loadWalletDetails(dispatch, web3, web3Socket, tennisPlayer, tennisPlayerSocket);
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
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectAll}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(account !== null) ? "btn-success" : "btn-primary"}`}>
                                        {(account !== null) ? "Connect All Again" : "Connect All"}
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
        web3Socket: web3SocketSelector(state),
        account: accountSelector(state),
        game: gameSelector(state),
        tennisPlayer: tennisPlayerSelector(state),
        tennisPlayerSocket: tennisPlayerSocketSelector(state)
	}
}

export default connect(mapStateToProps)(Connections);