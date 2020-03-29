// Author: Alex Roan
pragma solidity ^0.5.5;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";

// TennisPlayer ERC721 Token
contract TennisPlayerBase is ERC721, Ownable {

    using SafeMath for uint;
    using SafeCast for uint;

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

	// Cast and add a uint8 to a uint8
    function castAdd8(uint8 _a, uint8 _b) internal pure returns (uint8) {
        return uint(_a).add(uint(_b)).toUint8();
    }

    // Cast and subtract a uint8 from uint8
    function castSubtract8(uint8 _a, uint8 _b) internal pure returns (uint8) {
        return uint(_a).sub(uint(_b)).toUint8();
    }

    // Cast and subtract a uint8 from a uint
    function castSubtract256(uint _a, uint8 _b) internal pure returns (uint) {
        return _a.sub(uint(_b));
    }
}
