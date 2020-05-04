import { loadOwnedPlayers, loadWalletDetails, unselectPlayer, loadSelectedPlayer } from "./interactions";
import { playerFinishedResting, playerFinishedTraining } from "./actions";

export const subscribeToTransferEvents = async (dispatch, tennisPlayer, tennisPlayerSocket, account) => {
    tennisPlayerSocket.events.Transfer({})
        .on('data', async function(event){
            console.log("Transfer event found!");
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
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

export const subscribeToAccountsChanging = async (dispatch, web3, web3Socket, tennisPlayer) => {
    window.ethereum.on('accountsChanged', function (accounts) {
        loadWalletDetails(dispatch, web3, web3Socket, tennisPlayer);
        unselectPlayer(dispatch);
    });
}