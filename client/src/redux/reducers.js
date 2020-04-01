import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'ACCOUNT_LOADING':
            return { ...state, accountLoading: true};
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account, accountLoading: false };
        default:
            return state;
    }
}

const rootReducer = new combineReducers({
    web3
});

export default rootReducer;