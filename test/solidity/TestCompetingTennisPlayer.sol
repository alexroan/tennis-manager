pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "../../contracts/CompetingTennisPlayer.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./Utils.sol";
import "./PlayerTestValues.sol";

contract TestCompetingTennisPlayer is ERC721Holder, PlayerTestValues {

    using Utils for CompetingTennisPlayer;
    using SafeMath for uint;

    CompetingTennisPlayer competing;
    uint player1;
    uint player2;

    function beforeEach() public {
        address tokenOwner = address(this);
        competing = new CompetingTennisPlayer();
        player1 = competing.newPlayer(xp, name, age, height, condition, agility,
            power, stamina, technique, tokenOwner);
        player2 = competing.newPlayer(p2xp, p2name, p2age, p2height, p2condition, p2agility,
            p2power, p2stamina, p2technique, tokenOwner);
    }

    function testItEnlists() public {
        bool isEnlisted = competing.enlistedPlayers(player1);
        Assert.isFalse(isEnlisted, "Should be unlisted initially");
        competing.enlist(player1);
        isEnlisted = competing.enlistedPlayers(player1);
        Assert.isTrue(isEnlisted, "Should be enlisted");
        competing.delist(player1);
        isEnlisted = competing.enlistedPlayers(player1);
        Assert.isFalse(isEnlisted, "Should be unlisted");
    }

    function testItPlaysMatch() public {
        CompetingTennisPlayer.Player memory player1Details = competing.getPlayer(player1);
        CompetingTennisPlayer.Player memory player2Details = competing.getPlayer(player2);
        Assert.equal(uint(player1Details.condition), uint(condition), "Player 1 should be good starting condition");
        Assert.equal(uint(player2Details.condition), uint(p2condition), "Player 2 should be good starting condition");
        uint player1InitialXp = player1Details.xp;
        uint player2InitialXp = player2Details.xp;

        competing.enlist(player1);
        competing.enlist(player2);
        competing.playMatch(player2, player1);

        player1Details = competing.getPlayer(player1);
        player2Details = competing.getPlayer(player2);
        Assert.equal(uint(player1Details.condition), uint(condition).sub(uint(competing.conditionCostToPlay())),
            "Player 1 should have lowered condition");
        Assert.equal(uint(player2Details.condition), uint(p2condition).sub(uint(competing.conditionCostToPlay())),
            "Player 2 should have lowered condition");

        Assert.equal(player1Details.xp, player1InitialXp.add(uint(competing.xpGainLose())), "Lose XP should be applied to player 1");
        Assert.equal(player2Details.xp, player2InitialXp.add(uint(competing.xpGainWin())), "Lose XP should be applied to player 2");

    }

    //TODO test that only owners can enlist, delist and play
    //TODO test that only enlisted players can play matches
    //TODO test bad condition players can't enlist
    //TODO test bad condition players get auto delisted before match
    //TODO test bad condition players after match get delisted
    //TODO test already enlisted can't enlist again
    //TODO test delisted can't delist
}