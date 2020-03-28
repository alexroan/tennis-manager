// Author: Alex Roan
pragma solidity ^0.5.5;

import "./TennisPlayerBase.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";


contract TrainableTennisPlayer is TennisPlayerBase {

    using SafeMath for uint;
    using SafeCast for uint;

    // TODO - xp costs to change depending on current attribute level?

    // Training costs
    uint8 conditionCostToTrain = 5;
    uint8 xpCostToTrain = 8;
    uint8 attributeGainOnTrain = 1;

    // Rest costs and gains
    uint8 xpCostToRest = 6;
    uint8 conditionGainOnRest = 15;

    enum Attribute { agility, power, stamina, technique }

    // Train a player increasing an attribute
    function train(uint _id, Attribute _attr) public {
        // Only the owner of the player can train
        require(ownerOf(_id) == msg.sender, "Must be owner of player to train");

        // The player must be fit enough to train
        players[_id].condition = castSubtract8(players[_id].condition, conditionCostToTrain);
        // Must have enough XP
        players[_id].xp = castSubtract256(players[_id].xp, xpCostToTrain);

        // Increase the chosen attribute
        if (_attr == Attribute.agility) {
            players[_id].agility = castAdd8(players[_id].agility, attributeGainOnTrain);
        }
        else if (_attr == Attribute.power) {
            players[_id].power = castAdd8(players[_id].power, attributeGainOnTrain);
        }
        else if (_attr == Attribute.stamina) {
            players[_id].stamina = castAdd8(players[_id].stamina, attributeGainOnTrain);
        }
        else if (_attr == Attribute.technique) {
            players[_id].technique = castAdd8(players[_id].technique, attributeGainOnTrain);
        }
    }

    // Rest player, increasing condition
    function rest(uint _id) public {
        // Only the owner of the player can rest
        require(ownerOf(_id) == msg.sender, "Must be owner of player to rest");

        // Must have enough XP
        players[_id].xp = castSubtract256(players[_id].xp, xpCostToRest);
        players[_id].condition = castAdd8(players[_id].condition, conditionGainOnRest);
    }

    // Cast and add a uint8 to a uint8
    function castAdd8(uint8 _a, uint8 _b) private pure returns (uint8) {
        return uint(_a).add(uint(_b)).toUint8();
    }

    // Cast and subtract a uint8 from uint8
    function castSubtract8(uint8 _a, uint8 _b) private pure returns (uint8) {
        return uint(_a).sub(uint(_b)).toUint8();
    }

    // Cast and subtract a uint8 from a uint
    function castSubtract256(uint _a, uint8 _b) private pure returns (uint) {
        return _a.sub(uint(_b));
    }

}