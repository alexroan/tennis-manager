var TrainableTennisPlayer = artifacts.require("./TrainableTennisPlayer.sol");

module.exports = function(deployer) {
  deployer.deploy(TrainableTennisPlayer);
};
