//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIdCounter;
    mapping (address => uint) tokensAmount;
    uint public maxTotalSupply;
    uint public constant mintingFee = 1e15 wei;
    address private withdrawalReceiver;

    constructor(uint _maxTotalSupply, address _withdrawalReceiver) ERC721("NFToken", "NFT") public {
        maxTotalSupply = _maxTotalSupply;
        withdrawalReceiver = _withdrawalReceiver;
    }

    function _baseURI() internal view override(ERC721) returns (string memory) {
        return "https://bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna.ipfs.dweb.link";
    }

    function mint(uint8 _amount) public payable {
        require(_amount <= 3, "NFT: User can't mint more than 3 tokens in one mint");
        require(tokensAmount[msg.sender] + _amount <= 6, "NFT: User can't have more than 6 tokens");
        require(msg.value == mintingFee * _amount, "NFT: User must pay exact 0.001 ether for one token minting");
        require(tokenIdCounter.current() + _amount <= maxTotalSupply, "NFT: Users can't mint more than maximum total supply");

        tokensAmount[msg.sender] += _amount;

        for (uint i = 0; i < _amount; i++) {
            _safeMint(msg.sender, tokenIdCounter.current());
            tokenIdCounter.increment();
        }
    }

    function withdraw() public onlyOwner {
        payable(withdrawalReceiver).transfer(address(this).balance);
    }
}
