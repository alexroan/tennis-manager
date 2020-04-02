import { loadOwnedPlayers } from "./interactions";

export const subscribeToEvents = async (dispatch, tennisPlayer, account) => {
    tennisPlayer.events.Transfer({filter: {to: account}})
        .on('data', async function(event){
            console.log(dispatch, tennisPlayer, account);
            await loadOwnedPlayers(dispatch, tennisPlayer, account);
        })
        .on('error', console.error);
}