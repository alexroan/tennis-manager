export function web3Loaded(connection){
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function web3SocketLoaded(socket){
    return {
        type: 'WEB3_SOCKET_LOADED',
        socket
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

export function tennisPlayerSocketLoaded(tennisPlayerSocket){
    return {
        type: 'TENNIS_PLAYER_SOCKET_LOADED',
        tennisPlayerSocket
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

export function playerDetailsLoaded(player, id){
    return {
        type: 'PLAYER_DETAILS_SELECTED',
        player,
        id
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

export function creatingPlayer(){
    return {
        type: 'CREATING_PLAYER'
    }
}

export function playerCreated(){
    return {
        type: 'PLAYER_CREATED'
    }
}

export function playerIsTraining(){
    return {
        type: 'PLAYER_TRAINING'
    }
}

export function playerFinishedTraining(){
    return {
        type: 'PLAYER_FINISHED_TRAINING'
    }
}

export function playerIsResting(){
    return {
        type: 'PLAYER_RESTING'
    }
}

export function playerFinishedResting(){
    return {
        type: 'PLAYER_FINISHED_RESTING'
    }
}

export function newPlayerModalShow(showModal){
    return {
        type: 'NEW_PLAYER_MODAL_SHOW',
        showModal
    }
}

export function isEnlisted(value){
    return {
        type: 'IS_PLAYER_ENLISTED',
        value
    }
}

export function playerChangingEnlisting(){
    return {
        type: 'PLAYER_CHANGING_ENLISTING'
    }
}

export function changeOpponentId(id) {
    return {
        type: 'CHANGE_OPPONENT_ID',
        id
    }
}

export function matchStarting() {
    return {
        type: 'MATCH_STARTING'
    }
}

export function matchFinished(returnValues) {
    return {
        type: 'MATCH_FINISHED',
        returnValues
    }
}

export function closeResult(){
    return {
        type: 'CLOSE_RESULT'
    } 
}

export function setEnlistedPlayers(players){
    return {
        type: 'ENLISTED_PLAYERS',
        players
    }
}