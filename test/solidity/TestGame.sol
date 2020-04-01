// Author: Alex Roan
pragma solidity ^0.5.5;

import "truffle/Assert.sol";
import "../../contracts/Game.sol";
import "../../contracts/TennisPlayer.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Holder.sol";
import "./Utils.sol";


contract TestGame is ERC721Holder {

    using Utils for TennisPlayer;

    Game game;
    TennisPlayer playerToken;

    function beforeAll() public {
        game = new Game();
        playerToken = TennisPlayer(game.playerTokenAddress());
    }

    function testItCreatesPlayers() public {
        // First player
        string memory player1Name = "Alex Roan";
        uint8 player1Age = 27;
        uint8 player1Height = 190;
        uint player1Id = game.newPlayer(player1Name, player1Age, player1Height);

        Assert.equal(player1Id, 0, "Should make the first Player");
        TennisPlayer.Player memory player1Details = playerToken.getPlayer(player1Id);
        Assert.equal(player1Details.name, player1Name, "Should create correct new player 1 name");
        Assert.equal(uint(player1Details.age), uint(player1Age), "Should create correct new player 1 age");
        Assert.equal(uint(player1Details.height), uint(player1Height), "Should create correct new player 1 height");

        // Second player
        string memory player2Name = "Andy Murray";
        uint8 player2Age = 29;
        uint8 player2Height = 185;
        uint player2Id = game.newPlayer(player2Name, player2Age, player2Height);

        Assert.equal(player2Id, 1, "Should make the second Player");
        TennisPlayer.Player memory player2Details = playerToken.getPlayer(player2Id);
        Assert.equal(player2Details.name, player2Name, "Should create correct new player 2 name");
        Assert.equal(uint(player2Details.age), uint(player2Age), "Should create correct new player 2 age");
        Assert.equal(uint(player2Details.height), uint(player2Height), "Should create correct new player 2 height");

    }

}