import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'WEB3_SOCKET_LOADED':
            return { ...state, socket: action.socket};
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account, accountLoaded: true};
        case 'GAME_LOADED':
            return { ...state, game: action.game, gameLoaded: true };
        case 'TENNIS_PLAYER_LOADED':
            return { ...state, tennisPlayer: action.tennisPlayer, tennisPlayerLoaded: true };
        case 'TENNIS_PLAYER_SOCKET_LOADED':
            return { ...state, tennisPlayerSocket: action.tennisPlayerSocket, tennisPlayerSocketLoaded: true };
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case 'OWNED_PLAYERS_LOADED':
            return { ...state, ownedPlayers: action.ownedPlayers};
        case 'PLAYER_DETAILS_SELECTED':
            return { ...state, selectedPlayerDetails: action.player, selectedPlayerId: action.id};
        case 'CLEAR_SELECTED_PLAYER':
            return { ...state, selectedPlayerDetails: false, selectedPlayerId: false};
        default:
            return state;
    }
}

function competing(state = {}, action) {
    switch (action.type) {
        case 'IS_PLAYER_ENLISTED':
            return { ...state, enlistingChanging: false, isEnlisted: action.value }
        case 'PLAYER_CHANGING_ENLISTING':
            return { ...state, enlistingChanging: true }
        case 'ENLISTED_PLAYERS':
            return { ...state, enlistedPlayers: action.players}
        case 'CHANGE_OPPONENT_ID':
            return { ...state, opponentId: action.id }
        case 'MATCH_STARTING':
            return { ...state, playingMatch: true }
        case 'MATCH_FINISHED':
            let matchResult = "lose";
            if( action.returnValues.winner === action.returnValues.playerId) {
                matchResult = "win";
            }
            return { ...state, playingMatch: false, matchResult: matchResult, showResult: true}
        case 'CLOSE_RESULT':
            return { ...state, showResult: false}
        default:
            return state;
    }
}

function newPlayer(state = {}, action) {
    switch (action.type) {
        case 'CREATING_PLAYER':
            return { ...state, creatingPlayer: true }
        case 'PLAYER_CREATED':
            return { ...state, creatingPlayer: false }
        case 'NEW_PLAYER_MODAL_SHOW':
            return { ...state, showModal: action.showModal}
        case 'NEW_PLAYER_NAME_CHANGE':
            return { ...state, name: action.name}
        case 'NEW_PLAYER_AGE_CHANGE':
            return { ...state, age: action.age}
        case 'NEW_PLAYER_HEIGHT_CHANGE':
            return { ...state, height: action.height}
        default:
            return state;
    }
}

function training(state = {}, action) {
    switch (action.type) {
        case 'PLAYER_TRAINING':
            return { ...state, isTraining: true }
        case 'PLAYER_FINISHED_TRAINING':
            return { ...state, isTraining: false }
        case 'PLAYER_RESTING':
            return { ...state, isResting: true }
        case 'PLAYER_FINISHED_RESTING':
            return { ...state, isResting: false }
        case 'TRAINABLE_ATTRIBUTE_SELECTED':
            return { ...state, attributeName: action.name, attributeId: action.id};
        case 'TRAINING_DETAILS_LOADED':
            return { 
                ...state, 
                conditionCostToTrain: action.conditionCostToTrain,
                xpCostToTrain: action.xpCostToTrain,
                attributeGain: action.attributeGain,
                xpCostToRest: action.xpCostToRest,
                conditionGainOnRest: action.conditionGainOnRest
            }
        default:
            return state;
    }
}

const rootReducer = new combineReducers({
    web3, user, newPlayer, training, competing
});

export default rootReducer;