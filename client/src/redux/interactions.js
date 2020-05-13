import {getWeb3, getWeb3Socket} from "../getWeb3";
import Game from "../contracts/Game.json";
import TennisPlayer from "../contracts/TennisPlayer.json";
import {web3Loaded, accountLoaded, gameLoaded, tennisPlayerLoaded, ownedPlayersLoaded, playerDetailsLoaded, clearSelectedPlayer, trainableAttributeSelected, trainingDetailsLoaded, playerIsTraining, playerIsResting, web3SocketLoaded, tennisPlayerSocketLoaded, creatingPlayer, isEnlisted, playerChangingEnlisting, changeOpponentId, matchStarting, closeResult, setEnlistedPlayers} from "./actions";
import { subscribeToTransferEvents, subscribeToAccountsChanging, subscribeToTrainingEvents, subscribeToMatchEvents } from "./subscriptions";

export const loadWeb3 = async (dispatch) => {
    const web3 = await getWeb3();
    dispatch(web3Loaded(web3));
    return web3;
}

export const loadWeb3Socket = async (dispatch, web3) => {
    const web3Socket = await getWeb3Socket(web3);
    dispatch(web3SocketLoaded(web3Socket));
    return web3Socket;
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
    const instance = new web3.eth.Contract(TennisPlayer.abi, address);
    dispatch(tennisPlayerLoaded(instance));
    return instance;
}

export const loadTennisPlayerSocket = async (dispatch, web3Socket, game) => {
    const address = await game.methods.playerTokenAddress().call();
    const socketInstance = new web3Socket.eth.Contract(TennisPlayer.abi, address);
    dispatch(tennisPlayerSocketLoaded(socketInstance));
    return socketInstance;
}

export const loadWalletDetails = async (dispatch, web3, web3Socket, tennisPlayer, tennisPlayerSocket) => {
    const account = await loadWallet(dispatch, web3);
    await loadOwnedPlayers(dispatch, tennisPlayer, account);
    subscribeToTransferEvents(dispatch, tennisPlayer, tennisPlayerSocket, account);
    subscribeToAccountsChanging(dispatch, web3, web3Socket, tennisPlayer);
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
            dispatch(creatingPlayer());
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const loadSelectedPlayer = async (dispatch, tennisPlayer, tennisPlayerSocket, id) => {
    const player = await tennisPlayer.methods.players(id).call();
    dispatch(playerDetailsLoaded(player, id));
    subscribeToTrainingEvents(dispatch, tennisPlayer, tennisPlayerSocket, id);
    subscribeToMatchEvents(dispatch, tennisPlayer, tennisPlayerSocket, id);
    checkIfPlayerEnlisted(dispatch, tennisPlayer, id);
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
        .on('error', (error) => {
            console.log(error);
        });
}

export const restPlayer = async (dispatch, tennisPlayer, playerId, account) => {
    tennisPlayer.methods.rest(playerId).send({from: account})
        .once('transactionHash', (hash) => {
            dispatch(playerIsResting());
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const checkIfPlayerEnlisted = async (dispatch, tennisPlayer, playerId) => {
    const enlisted = await tennisPlayer.methods.enlistedPlayers(playerId).call();
    dispatch(isEnlisted(enlisted));
    return enlisted;
}

export const enlistToCompete = async (dispatch, tennisPlayer, playerId, account) => {
    tennisPlayer.methods.enlist(playerId).send({from: account})
        .once('transactionHash', (hash) => {
            dispatch(playerChangingEnlisting());
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const delistToCompete = async (dispatch, tennisPlayer, playerId, account) => {
    tennisPlayer.methods.delist(playerId).send({from:account})
        .once('transactionHash', (hash) => {
            dispatch(playerChangingEnlisting());
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const opponentIdChanged = async (dispatch, opponentId) => {
    dispatch(changeOpponentId(opponentId));
}

export const playMatch = async (dispatch, tennisPlayer, playerId, account, opponentId) => {
    tennisPlayer.methods.playMatch(playerId, opponentId).send({from:account})
        .once('transactionHash', (hash) => {
            dispatch(matchStarting());
        })
        .on('error', (error) => {
            console.log(error);
        });
}

export const getEnlistedPlayers = async (dispatch, tennisPlayer, playerId) => {
    const enlistEvents = await tennisPlayer.getPastEvents("Enlist", {fromBlock:0, toBlock:'latest'});
    const filteredEnlistEvents = [...new Set(enlistEvents.map(item => item.returnValues.playerId))];
    let enlistedPlayers = [];
    for (let i = (filteredEnlistEvents.length-1); i >= 0; i--) {
        const element = filteredEnlistEvents[i];
        if (element !== playerId){
            let isEnlisted = await tennisPlayer.methods.enlistedPlayers(element).call();
            if (isEnlisted) {
                enlistedPlayers.push(element);
            }
        }
    }
    dispatch(setEnlistedPlayers(enlistedPlayers));
}

export const closeResultModal = (dispatch) => {
    dispatch(closeResult());
}