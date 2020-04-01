export function web3Loaded(connection){
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function accountLoaded(account){
    return {
        type: 'ACCOUNT_LOADED',
        account
    }
}

export function gameLoaded(game){
    return {
        type: 'GAME_LOADED',
        game
    }
}

export function tennisPlayerLoaded(tennisPlayer){
    return {
        type: 'TENNIS_PLAYER_LOADED',
        tennisPlayer
    }
}

export function ownedPlayersLoaded(ownedPlayers){
    return {
        type: 'OWNED_PLAYERS_LOADED',
        ownedPlayers
    }
}

export function newPlayerNameChange(name){
    return {
        type: 'NEW_PLAYER_NAME_CHANGE',
        name
    }
}
export function newPlayerAgeChange(age){
    return {
        type: 'NEW_PLAYER_AGE_CHANGE',
        age
    }
}
export function newPlayerHeightChange(height){
    return {
        type: 'NEW_PLAYER_HEIGHT_CHANGE',
        height
    }
}