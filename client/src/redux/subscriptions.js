import { loadOwnedPlayers, loadWalletDetails, unselectPlayer, loadSelectedPlayer } from "./interactions";

export const subscribeToTransferEvents = async (dispatch, tennisPlayer, account, web3) => {
    tennisPlayer.events.Transfer({filter: {to: account}})
        .on('data', async function(event){
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
        })
        .on('error', console.error);
}

export const subscribeToTrainingEvents = async (dispatch, tennisPlayer, playerId) => {
    tennisPlayer.events.Train({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await loadSelectedPlayer(dispatch, tennisPlayer, playerId);
        })
        .on('error', console.error);

    tennisPlayer.events.Rest({filter: {playerId: playerId}})
        .once('data', async function(event) {
            await loadSelectedPlayer(dispatch, tennisPlayer, playerId);
        })
        .on('error', console.error);
}

export const subscribeToAccountsChanging = async (dispatch, web3, tennisPlayer) => {
    window.ethereum.on('accountsChanged', function (accounts) {
        loadWalletDetails(dispatch, web3, tennisPlayer);
        unselectPlayer(dispatch);
    });
}