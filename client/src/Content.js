import React, {Component} from 'react';
import {connect} from 'react-redux';
import { loadWeb3, loadWallet, loadGame } from './redux/interactions';
import { web3Selector, accountSelector, gameSelector } from './redux/selectors';

class Content extends Component {
    render() {
        const {dispatch, web3, account, game} = this.props;

        const connectBlockchain = async (e) => {
            e.preventDefault();
            await loadWeb3(dispatch);
        }

        const connectWallet = async (e) => {
            e.preventDefault();
            await loadWallet(dispatch, web3);
        }
        
        const connectGame = async (e) => {
            e.preventDefault();
            console.log("connecting game");
            loadGame(dispatch, web3);
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
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectWallet}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(web3 === null) ? "disabled btn-danger" : (account !== null) ? "btn-success" : "btn-warning" }`}>
                                        {(account !== null) ? account : "Connect Wallet"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <form onSubmit={connectGame}>
                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className={`w-100 btn text-truncate ${(account === null) ? "disabled btn-danger" : (game !== null) ? "btn-success" : "btn-warning" }`}>
                                        {(game !== null) ? "Game Ready" : "Connect Game"}
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
        game: gameSelector(state)
	}
}

export default connect(mapStateToProps)(Content);