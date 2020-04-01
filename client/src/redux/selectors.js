import {get} from 'lodash';
import {createSelector} from 'reselect';

const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);