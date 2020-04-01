import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account };
        case 'GAME_LOADED':
            return { ...state, game: action.game };
        default:
            return state;
    }
}

function game(state = {}, action) {
    switch (action.type) {
        
        default:
            return state;
    }
}

const rootReducer = new combineReducers({
    web3, game
});

export default rootReducer;