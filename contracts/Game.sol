// Author: Alex Roan
pragma solidity ^0.5.5;

import "./TennisPlayer.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Game is Ownable {

    address public playerTokenAddress;

    uint private xp = 100;
    uint8 private condition = 255;
    uint8 private agility = 1;
    uint8 private power = 1;
    uint8 private stamina = 2;
    uint8 private technique = 1;

    constructor() public {
        playerTokenAddress = address(new TennisPlayer());
    }

    function newPlayer(string memory _name, uint8 _age, uint8 _height) public returns (uint){
        return TennisPlayer(playerTokenAddress).newPlayer(
            xp, _name, _age, _height, condition, agility, power, stamina, technique, msg.sender
        );
    }

}