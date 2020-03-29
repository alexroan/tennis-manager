// Author: Alex Roan
pragma solidity ^0.5.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

// TennisPlayer ERC721 Token
contract TennisPlayerBase is ERC721, Ownable {

	// Player information
	struct Player {
		// game details
		bool isBot;
		uint xp;
		// personal details
		string name;
		uint8 age;
		uint8 height;
		uint8 condition;
		// attributes
		uint8 agility;
		uint8 power;
		uint8 stamina;
		uint8 technique;
	}

	// List of all players
	Player[] public players;

	// Create new player on behalf of manager
	function newPlayer(
		bool _isBot,
		uint _xp,
		string memory _name,
		uint8 _age,
		uint8 _height,
		uint8 _condition,
		uint8 _agility,
		uint8 _power,
		uint8 _stamina,
		uint8 _technique,
		address _to
	) public onlyOwner returns (uint)
	{
		uint id = players.length;
		players.push(
			Player( _isBot, _xp, _name, _age, _height, _condition,
				_agility, _power, _stamina, _technique)
		);
		_safeMint(_to, id);
		return id;
	}
}
