import {get} from 'lodash';
import {createSelector} from 'reselect';

// WEB3
const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, a => a);

const accountLoaded = state => get(state, 'web3.accountLoaded', false);
export const accountLoadedSelector = createSelector(accountLoaded, a => a);

const game = state => get(state, 'web3.game', null);
export const gameSelector = createSelector(game, a => a);

const gameLoaded = state => get(state, 'web3.gameLoaded', false);
export const gameLoadedSelector = createSelector(gameLoaded, a => a);

const tennisPlayer = state => get(state, 'web3.tennisPlayer', null);
export const tennisPlayerSelector = createSelector(tennisPlayer, a => a);

const tennisPlayerLoaded = state => get(state, 'web3.tennisPlayerLoaded', false);
export const tennisPlayerLoadedSelector = createSelector(tennisPlayerLoaded, a => a);

// USER
const ownedPlayers = state => get(state, 'user.ownedPlayers', []);
export const ownedPlayersSelector = createSelector(ownedPlayers, a => a);

const selectedPlayerId = state => get(state, 'user.selectedPlayerId', false);
export const selectedPlayerIdSelector = createSelector(selectedPlayerId, a => a);

const selectedPlayerDetails = state => get(state, 'user.selectedPlayerDetails', false);
export const selectedPlayerDetailsSelector = createSelector(selectedPlayerDetails, a => a);

// NEW PLAYER
const showNewPlayerModal = state => get(state, 'newPlayer.showModal', false);
export const showNewPlayerModalSelector = createSelector(showNewPlayerModal, a => a);

const newPlayerName = state => get(state, 'newPlayer.name', null);
export const newPlayerNameSelector = createSelector(newPlayerName, a => a);

const newPlayerAge = state => get(state, 'newPlayer.age', null);
export const newPlayerAgeSelector = createSelector(newPlayerAge, a => a);

const newPlayerHeight = state => get(state, 'newPlayer.height', null);
export const newPlayerHeightSelector = createSelector(newPlayerHeight, a => a);

//TRAINING
const selectedTrainableAttributeName = state => get(state, 'training.attributeName', null);
export const selectedTrainableAttributeNameSelector = createSelector(selectedTrainableAttributeName, a => a);

const selectedTrainableAttributeId = state => get(state, 'training.attributeId', null);
export const selectedTrainableAttributeIdSelector = createSelector(selectedTrainableAttributeId, a => a);

const conditionCostToTrain = state => get(state, 'training.conditionCostToTrain', null);
export const conditionCostToTrainSelector = createSelector(conditionCostToTrain, a => a);

const xpCostToTrain = state => get(state, 'training.xpCostToTrain', null);
export const xpCostToTrainSelector = createSelector(xpCostToTrain, a => a);

const attributeGain = state => get(state, 'training.attributeGain', null);
export const attributeGainSelector = createSelector(attributeGain, a => a);

const xpCostToRest = state => get(state, 'training.xpCostToRest', null);
export const xpCostToRestSelector = createSelector(xpCostToRest, a => a);

const conditionGainOnRest = state => get(state, 'training.conditionGainOnRest', null);
export const conditionGainOnRestSelector = createSelector(conditionGainOnRest, a => a);

const isTraining = state => get(state, 'training.isTraining', null);
export const isTrainingSelector = createSelector(isTraining, a => a);

const isResting = state => get(state, 'training.isResting', null);
export const isRestingSelector = createSelector(isResting, a => a);