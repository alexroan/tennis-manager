import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account, accountLoaded: true};
        case 'GAME_LOADED':
            return { ...state, game: action.game, gameLoaded: true };
        case 'TENNIS_PLAYER_LOADED':
            return { ...state, tennisPlayer: action.tennisPlayer, tennisPlayerLoaded: true };
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case 'OWNED_PLAYERS_LOADED':
            return { ...state, ownedPlayers: action.ownedPlayers};
        case 'PLAYER_DETAILS_SELECTED':
            return { ...state, selectedPlayerDetails: action.player};
        case 'CLEAR_SELECTED_PLAYER':
            return { ...state, selectedPlayerDetails: false};
        default:
            return state;
    }
}

function newPlayer(state = {}, action) {
    switch (action.type) {
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
        case 'TRAINABLE_ATTRIBUTE_SELECTED':
            return { ...state, attributeName: action.name, attributeId: action.id};
        default:
            return state;
    }
}

const rootReducer = new combineReducers({
    web3, user, newPlayer, training
});

export default rootReducer;