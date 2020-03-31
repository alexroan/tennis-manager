// Author: Alex Roan
pragma solidity ^0.5.5;

import "./TennisPlayerBase.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";

contract CompetingTennisPlayer is TennisPlayerBase {

    using SafeMath for uint;
    using SafeCast for uint;

    // conditionCostToPlay
    uint8 public conditionCostToPlay = 20;
    // xpGainWin
    uint8 public xpGainWin = 10;
    // xpGainLose
    uint8 public xpGainLose = 5;

    // enlistedPlayers
    mapping(uint => bool) public enlistedPlayers;

    // enlistEvent
    event Enlist(uint indexed playerId);
    // delistEvent
    event Delist(uint indexed playerId);
    // matchPlayed
    event MatchPlayed(uint indexed playerId, uint indexed opponentId, uint indexed winner);

    // Enlist player to compete with others
    function enlist(uint _id) public {
        // Only the owner of the player can train
        require(ownerOf(_id) == msg.sender, "Must be owner of player to enlist");
        // Must not be enlisted already
        require(enlistedPlayers[_id] == false, "Must not already be enlisted");
        // Match fit check
        require(players[_id].condition >= conditionCostToPlay, "Must be match fit to enlist");

        // Enlist
        enlistedPlayers[_id] = true;
        // Emit event
        emit Enlist(_id);
    }

    // Delist player from competing with others
    function delist(uint _id) public {
        // Only the owner of the player can train
        require(ownerOf(_id) == msg.sender, "Must be owner of player to enlist");
        // Must be enlisted
        require(enlistedPlayers[_id] == true, "Must be enlisted");
        // Run delist
        _delist(_id);
    }

    // Play match against opponent
    function playMatch(uint _id, uint _opponentId) public {
        // Only the owner of the player can train
        require(ownerOf(_id) == msg.sender, "Must be owner of player to enlist");
        // Must be enlisted
        require(enlistedPlayers[_id] == true, "Must be enlisted");
        // Opponent must be enlisted
        require(enlistedPlayers[_opponentId] == true, "Opponent must be enlisted");
        // Ensure player's condition is high enough
        _requireMatchCondition(_id, "Player not match condition");
        // Ensure opponents's condition is high enough
        _requireMatchCondition(_opponentId, "Opponent not match condition");

        // TODO move this to train?
        // TODO Better match mechanics
        uint playerScore = uint(players[_id].agility)
            .add(uint(players[_id].power))
            .add(uint(players[_id].stamina))
            .add(uint(players[_id].technique));

        uint opponentScore = uint(players[_opponentId].agility)
            .add(uint(players[_opponentId].power))
            .add(uint(players[_opponentId].stamina))
            .add(uint(players[_opponentId].technique));

        // condition changes
        players[_id].condition = uint(players[_id].condition).sub(uint(conditionCostToPlay)).toUint8();
        players[_opponentId].condition = uint(players[_opponentId].condition).sub(uint(conditionCostToPlay)).toUint8();
        // determine winner
        (uint winner, uint loser) = (playerScore >= opponentScore) ? (_id, _opponentId) : (_opponentId, _id);
        // xp changes
        players[winner].xp = uint(players[winner].xp).add(uint(xpGainWin));
        players[loser].xp = uint(players[loser].xp).add(uint(xpGainLose));
        // emit matchplayed
        emit MatchPlayed(_id, _opponentId, winner);
        // check condition again
        _isMatchCondition(_id);
        _isMatchCondition(_opponentId);
    }

    // Perform the delisting
    function _delist(uint _id) private {
        // Delist
        enlistedPlayers[_id] = false;
        // Emit event
        emit Delist(_id);
    }

    // Revert if not match condition
    function _requireMatchCondition(uint _id, string memory _message) private {
        if (!_isMatchCondition(_id)) {
            revert(_message);
        }
    }

    // Check player is in match condition, if not, delist
    function _isMatchCondition(uint _id) private returns (bool) {
        // Ensure player's condition is high enough
        // Delist if not
        if (players[_id].condition <= conditionCostToPlay) {
            _delist(_id);
            return false;
        }
        return true;
    }
}