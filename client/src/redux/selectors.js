import {get} from 'lodash';
import {createSelector} from 'reselect';

const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);

const game = state => get(state, 'web3.game', null);
export const gameSelector = createSelector(game, a => a);