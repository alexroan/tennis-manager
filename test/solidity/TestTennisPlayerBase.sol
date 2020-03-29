pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "../../contracts/TennisPlayerBase.sol";

contract TestTennisPlayerBase is ERC721Holder{

    function getPlayer(TennisPlayerBase _basePlayer, uint _id) private view returns (TennisPlayerBase.Player memory) {
        (bool a, uint256 b, string memory c, uint8 d, uint8 e, uint8 f, uint8 g, uint8 h, uint8 i, uint8 j) = _basePlayer.players(_id);
        return TennisPlayerBase.Player(a,b,c,d,e,f,g,h,i,j);
    }

    function testItCreatesAPlayer() public {
        TennisPlayerBase basePlayer = new TennisPlayerBase();
        bool isBot = false;
        uint xp = 0;
        string memory name = "Alex Roan";
        uint8 age = 27;
        uint8 height = 190;
        uint8 condition = 255;
        uint8 agility = 4;
        uint8 power = 6;
        uint8 stamina = 4;
        uint8 technique = 5;
        address tokenOwner = address(this);
        uint id = basePlayer.newPlayer(isBot, xp, name, age, height, condition, agility,
            power, stamina, technique, tokenOwner);
        Assert.equal(id, 0, "It should create the first player");

        TennisPlayerBase.Player memory player = getPlayer(basePlayer, id);
        Assert.isFalse(player.isBot, "wrong bot value");
        Assert.equal(player.xp, xp, "wrong xp");
        Assert.equal(player.name, name, "wrong name");
        Assert.equal(uint(player.age), uint(age), "wrong age");
        Assert.equal(uint(player.height), uint(height), "wrong height");
        Assert.equal(uint(player.condition), uint(condition), "wrong condition");
        Assert.equal(uint(player.agility), uint(agility), "wrong agility");
        Assert.equal(uint(player.power), uint(power), "wrong power");
        Assert.equal(uint(player.stamina), uint(stamina), "wrong stamina");
        Assert.equal(uint(player.technique), uint(technique), "wrong technique");
        Assert.equal(basePlayer.ownerOf(id), tokenOwner, "wrong token owner");
    }
}