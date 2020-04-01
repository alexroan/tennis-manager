import getWeb3 from "../getWeb3";
import Game from "../contracts/Game.json";
import {web3Loaded, accountLoaded, gameLoaded} from "./actions";

export const loadWeb3 = async (dispatch) => {
    const web3 = await getWeb3();
    dispatch(web3Loaded(web3));
    return web3;
}

export const loadWallet = async (dispatch, web3) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    dispatch(accountLoaded(account));
    return account;
}

export const loadGame = async (dispatch, web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Game.networks[networkId];
    const instance = new web3.eth.Contract(
        Game.abi,
        deployedNetwork && deployedNetwork.address,
    );
    dispatch(gameLoaded(instance));
    return instance;
}