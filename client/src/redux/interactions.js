import getWeb3 from "../getWeb3";
import Game from "../contracts/Game.json";
import TennisPlayer from "../contracts/TennisPlayer.json";
import {web3Loaded, accountLoaded, gameLoaded, tennisPlayerLoaded, ownedPlayersLoaded} from "./actions";

export const loadWeb3 = async (dispatch) => {
    const web3 = await getWeb3();
    dispatch(web3Loaded(web3));
    return web3;
}

export const loadGameContract = async (dispatch, web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Game.networks[networkId];
    const instance = new web3.eth.Contract(
        Game.abi,
        deployedNetwork && deployedNetwork.address,
    );
    dispatch(gameLoaded(instance));
    return instance;
}

export const loadTennisPlayerContract = async (dispatch, web3, game) => {
    const address = await game.methods.playerTokenAddress().call();
    const instance = new web3.eth.Contract(
        TennisPlayer.abi,
        address,
    );
    dispatch(tennisPlayerLoaded(instance));
    return instance;
}

export const loadWallet = async (dispatch, web3) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch(accountLoaded(account));
    return account;
}

export const loadOwnedPlayers = async (dispatch, tennisPlayer, account) => {
    const ownedTokens = await tennisPlayer.methods.myPlayers().call({from: account});
    dispatch(ownedPlayersLoaded(ownedTokens));
    return ownedTokens;
}

export const createNewPlayer = async (dispatch, game, account, name, age, height) => {
    console.log(game, account, name, age, height);
    game.methods.newPlayer(name, age, height).send({from: account})
        .on('transactionHash', (hash) => {
            // dispatch(creatingNewPlayer(id));
            console.log("hash");
        })
        .on('receipt', (receipt) => {
            console.log("receipt");
        })
        .on('confirmation', (confirmation) => {
            console.log("confirmation");
        });
}