const TennisPlayer = artifacts.require("TennisPlayer");
const Game = artifacts.require("Game");

module.exports = async function(callback) {
    try{

        const accounts = await web3.eth.getAccounts()

        const gameContract = await Game.deployed();

        const tokenAddress = await gameContract.playerTokenAddress();
        const tennisInstance = new web3.eth.Contract(
            TennisPlayer.abi,
            tokenAddress,
        );
    
        const player = await tennisInstance.methods.players(0).call();
        console.log(player);
    }
    catch(error) {
        console.log(error);
    }


    callback();
}