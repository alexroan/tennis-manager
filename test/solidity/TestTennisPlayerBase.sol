pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "../../contracts/TennisPlayerBase.sol";
import "./Utils.sol";
import "./PlayerTestValues.sol";

contract TestTennisPlayerBase is ERC721Holder, PlayerTestValues {

    using Utils for TennisPlayerBase;

    function testItCreatesAPlayer() public {
        TennisPlayerBase basePlayer = new TennisPlayerBase();
        address tokenOwner = address(this);
        uint id = basePlayer.newPlayer(isBot, xp, name, age, height, condition, agility,
            power, stamina, technique, tokenOwner);
        Assert.equal(id, 0, "It should create the first player");

        TennisPlayerBase.Player memory player = basePlayer.getPlayer(id);
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