import { loadOwnedPlayers, loadWalletDetails, unselectPlayer, loadSelectedPlayer, checkIfPlayerEnlisted } from "./interactions";
import { playerFinishedResting, playerFinishedTraining, playerCreated, matchFinished } from "./actions";

export const subscribeToTransferEvents = async (dispatch, tennisPlayer, tennisPlayerSocket, account) => {
    tennisPlayerSocket.events.Transfer({filter: {to: account}})
        .on('data', async function(event){
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
            dispatch(playerCreated());
        })
        .on('error', console.error);
}

export const subscribeToTrainingEvents = async (dispatch, tennisPlayer, tennisPlayerSocket, playerId) => {
    tennisPlayerSocket.events.Train({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await loadSelectedPlayer(dispatch, tennisPlayer, tennisPlayerSocket, playerId);
            dispatch(playerFinishedTraining());
        })
        .on('error', console.error);

    tennisPlayerSocket.events.Rest({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await loadSelectedPlayer(dispatch, tennisPlayer, tennisPlayerSocket, playerId);
            dispatch(playerFinishedResting());
        })
        .on('error', console.error);
}

export const subscribeToMatchEvents = async (dispatch, tennisPlayer, tennisPlayerSocket, playerId) => {
    tennisPlayerSocket.events.Enlist({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await checkIfPlayerEnlisted(dispatch, tennisPlayer, playerId);
        })
        .on('error', console.error);
    tennisPlayerSocket.events.Delist({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await checkIfPlayerEnlisted(dispatch, tennisPlayer, playerId);
        })
        .on('error', console.error);

    tennisPlayerSocket.events.MatchPlayed({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await loadSelectedPlayer(dispatch, tennisPlayer, tennisPlayerSocket, playerId);
            dispatch(matchFinished());
        })
        .on('error', console.error);
}

export const subscribeToAccountsChanging = async (dispatch, web3, web3Socket, tennisPlayer) => {
    window.ethereum.on('accountsChanged', function (accounts) {
        loadWalletDetails(dispatch, web3, web3Socket, tennisPlayer);
        unselectPlayer(dispatch);
    });
}