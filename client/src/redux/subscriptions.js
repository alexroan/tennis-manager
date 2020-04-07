import { loadOwnedPlayers, loadWalletDetails } from "./interactions";

export const subscribeToEvents = async (dispatch, tennisPlayer, account, web3) => {
    tennisPlayer.events.Transfer({filter: {to: account}})
        .on('data', async function(event){
            console.log(dispatch, tennisPlayer, account);
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
        })
        .on('error', console.error);
}

export const subscribeToAccountsChanging = async (dispatch, web3, tennisPlayer) => {
    window.ethereum.on('accountsChanged', function (accounts) {
        loadWalletDetails(dispatch, web3, tennisPlayer);
    });
}