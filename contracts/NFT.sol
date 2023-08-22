//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private tokenIdCounter;
    uint public maxTotalSupply;
    uint public constant mintingFee = 0.001 ether ;
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
        require(balanceOf(msg.sender) + _amount <= 6, "NFT: User can't have more than 6 tokens");
        require(msg.value == mintingFee * _amount, "NFT: User must pay exact 0.001 ether for one token minting");
        require(tokenIdCounter.current() + _amount <= maxTotalSupply, "NFT: Users can't mint more than maximum total supply");

        for (uint i = 0; i < _amount; i++) {
            _safeMint(msg.sender, tokenIdCounter.current());
            _setTokenURI(tokenIdCounter.current(), tokenURI(tokenIdCounter.current()));
            tokenIdCounter.increment();
        }
    }

    function tokenURI(uint256 _tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return string.concat(
            _baseURI(),
            Strings.toString(_tokenId)
        );
    }

    function withdraw() public onlyOwner {
        payable(withdrawalReceiver).transfer(address(this).balance);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}
