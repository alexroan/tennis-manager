pragma solidity ^0.5.5;

import "../../contracts/TennisPlayerBase.sol";

library Utils {

    function getPlayer(TennisPlayerBase _basePlayer, uint _id) internal view returns (TennisPlayerBase.Player memory) {
        (bool a, uint256 b, string memory c, uint8 d, uint8 e, uint8 f, uint8 g, uint8 h, uint8 i, uint8 j) = _basePlayer.players(_id);
        return TennisPlayerBase.Player(a,b,c,d,e,f,g,h,i,j);
    }

}