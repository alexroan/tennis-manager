pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "../../contracts/TrainableTennisPlayer.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Utils.sol";
import "./PlayerTestValues.sol";

contract TestTrainableTennisPlayer is ERC721Holder, PlayerTestValues {

    using Utils for TrainableTennisPlayer;
    using SafeMath for uint;

    TrainableTennisPlayer trainable;
    address tokenOwner;
    uint playerId;

    uint8 conditionCost;
    uint8 xpCost;
    uint8 attributeGainOnTrain;

    function beforeEach() public {
        trainable = new TrainableTennisPlayer();
        conditionCost = trainable.conditionCostToTrain();
        attributeGainOnTrain = trainable.attributeGainOnTrain();
        tokenOwner = address(this);
        playerId = trainable.newPlayer(isBot, xp, name, age, height, condition, agility,
            power, stamina, technique, tokenOwner);
    }

    function testItRests() public {
        trainable.rest(playerId);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);
        xpCost = trainable.xpCostToRest();
        uint8 conditionGain = trainable.conditionGainOnRest();
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost)), "Must deduct XP");
        Assert.equal(uint(player.condition), uint(condition).add(uint(conditionGain)), "Must increase condition");
    }

    function testTrainingTwoEachAttr() public {
        xpCost = trainable.xpCostToTrain();
        trainable.train(playerId, TrainableTennisPlayer.Attribute.agility);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.agility);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.power);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.power);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.stamina);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.stamina);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.technique);
        trainable.train(playerId, TrainableTennisPlayer.Attribute.technique);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);

        Assert.equal(uint(player.condition), uint(condition).sub(uint(conditionCost).mul(8)), "Must increase condition");
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost).mul(8)), "Must deduct XP");
        Assert.equal(uint(player.agility), uint(agility).add(uint(attributeGainOnTrain).mul(2)), "Must increase agility");
        Assert.equal(uint(player.power), uint(power).add(uint(attributeGainOnTrain).mul(2)), "Must increase power");
        Assert.equal(uint(player.stamina), uint(stamina).add(uint(attributeGainOnTrain).mul(2)), "Must increase stamina");
        Assert.equal(uint(player.technique), uint(technique).add(uint(attributeGainOnTrain).mul(2)), "Must increase technique");
    }

    function testAgility() public {
        xpCost = trainable.xpCostToTrain();
        trainable.train(playerId, TrainableTennisPlayer.Attribute.agility);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);
        Assert.equal(uint(player.condition), uint(condition).sub(uint(conditionCost)), "Must increase condition");
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost)), "Must deduct XP");
        Assert.equal(uint(player.agility), uint(agility).add(uint(attributeGainOnTrain)), "Must increase agility");
    }

    function testPower() public {
        xpCost = trainable.xpCostToTrain();
        trainable.train(playerId, TrainableTennisPlayer.Attribute.power);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);
        Assert.equal(uint(player.condition), uint(condition).sub(uint(conditionCost)), "Must increase condition");
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost)), "Must deduct XP");
        Assert.equal(uint(player.power), uint(power).add(uint(attributeGainOnTrain)), "Must increase power");
    }

    function testStamina() public {
        xpCost = trainable.xpCostToTrain();
        trainable.train(playerId, TrainableTennisPlayer.Attribute.stamina);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);
        Assert.equal(uint(player.condition), uint(condition).sub(uint(conditionCost)), "Must increase condition");
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost)), "Must deduct XP");
        Assert.equal(uint(player.stamina), uint(stamina).add(uint(attributeGainOnTrain)), "Must increase stamina");
    }

    function testTechnique() public {
        xpCost = trainable.xpCostToTrain();
        trainable.train(playerId, TrainableTennisPlayer.Attribute.technique);
        TrainableTennisPlayer.Player memory player = trainable.getPlayer(playerId);
        Assert.equal(uint(player.condition), uint(condition).sub(uint(conditionCost)), "Must increase condition");
        Assert.equal(uint(player.xp), uint(xp).sub(uint(xpCost)), "Must deduct XP");
        Assert.equal(uint(player.technique), uint(technique).add(uint(attributeGainOnTrain)), "Must increase technique");
    }
}