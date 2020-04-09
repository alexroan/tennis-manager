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

export function playerDetailsLoaded(player){
    return {
        type: 'PLAYER_DETAILS_SELECTED',
        player
    }
}

export function clearSelectedPlayer(){
    return {
        type: 'CLEAR_SELECTED_PLAYER'
    }
}

export function trainableAttributeSelected(name, id){
    return {
        type: 'TRAINABLE_ATTRIBUTE_SELECTED',
        name,
        id
    }
}

export function trainingDetailsLoaded(conditionCostToTrain, xpCostToTrain, attributeGain, xpCostToRest, conditionGainOnRest){
    return {
        type: 'TRAINING_DETAILS_LOADED',
        conditionCostToTrain,
        xpCostToTrain,
        attributeGain,
        xpCostToRest,
        conditionGainOnRest
    }
}