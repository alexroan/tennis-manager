import getWeb3 from "../getWeb3";
import Game from "../contracts/Game.json";
import TennisPlayer from "../contracts/TennisPlayer.json";
import {web3Loaded, accountLoaded, gameLoaded, tennisPlayerLoaded, ownedPlayersLoaded, playerDetailsLoaded, clearSelectedPlayer, trainableAttributeSelected, trainingDetailsLoaded, playerIsTraining, playerFinishedTraining, playerIsResting, playerFinishedResting} from "./actions";
import { subscribeToTransferEvents, subscribeToAccountsChanging, subscribeToTrainingEvents } from "./subscriptions";

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

export const loadWalletDetails = async (dispatch, web3, tennisPlayer) => {
    const account = await loadWallet(dispatch, web3);
    await loadOwnedPlayers(dispatch, tennisPlayer, account);
    subscribeToTransferEvents(dispatch, tennisPlayer, account, web3);
    subscribeToAccountsChanging(dispatch, web3, tennisPlayer);
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

export const createNewPlayer = async (dispatch, game, account, name, age, height, tennisPlayer) => {
    game.methods.newPlayer(name, age, height).send({from: account})
        .once('transactionHash', (hash) => {
            console.log("hash");
        })
        .once('receipt', (receipt) => {
            console.log("receipt");
        })
        .on('confirmation', async (confirmation, receipt) => {
            console.log("confirmation number:", confirmation);
            if(confirmation == 4) {
                await loadOwnedPlayers(dispatch, tennisPlayer, account);
            }
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const loadSelectedPlayer = async (dispatch, tennisPlayer, id) => {
    const player = await tennisPlayer.methods.players(id).call();
    dispatch(playerDetailsLoaded(player, id));
    subscribeToTrainingEvents(dispatch, tennisPlayer, id);
    return player;
}

export const unselectPlayer = async (dispatch) => {
    dispatch(clearSelectedPlayer());
}

export const selectTrainableAttribute = (dispatch, name, id) => {
    dispatch(trainableAttributeSelected(name, id));
}

export const loadTrainingCosts = async (dispatch, tennisPlayer) => {
    const conditionCostToTrain = await tennisPlayer.methods.conditionCostToTrain().call();
    const xpCostToTrain = await tennisPlayer.methods.xpCostToTrain().call();
    const attributeGain = await tennisPlayer.methods.attributeGainOnTrain().call();
    const xpCostToRest = await tennisPlayer.methods.xpCostToRest().call();
    const conditionGainOnRest = await tennisPlayer.methods.conditionGainOnRest().call();
    dispatch(trainingDetailsLoaded(conditionCostToTrain, xpCostToTrain, attributeGain, xpCostToRest, conditionGainOnRest));
}

export const trainPlayer = async (dispatch, tennisPlayer, playerId, attributeId, account) => {
    tennisPlayer.methods.train(playerId, attributeId).send({from: account})
        .once('transactionHash', (hash) => {
            dispatch(playerIsTraining());
        })
        .on('confirmation', async (confirmation, receipt) => {
            console.log("confirmation number:", confirmation);
            if(confirmation == 4) {
                await loadSelectedPlayer(dispatch, tennisPlayer, playerId);
                dispatch(playerFinishedTraining());
            }
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const restPlayer = async (dispatch, tennisPlayer, playerId, account) => {
    tennisPlayer.methods.rest(playerId).send({from: account})
        .once('transactionHash', (hash) => {
            dispatch(playerIsResting());
        })
        .on('confirmation', async (confirmation, receipt) => {
            console.log("confirmation number:", confirmation);
            if(confirmation == 4) {
                await loadSelectedPlayer(dispatch, tennisPlayer, playerId);
                dispatch(playerFinishedResting());
            }
        })
        .on('error', (error) => {
            console.log(error);
        });
}