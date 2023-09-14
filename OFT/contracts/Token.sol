//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Token is ERC20, Ownable {
    uint256 maxTotalSupply;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxTotalSupply,
        address[] memory _mintAddresses
    ) ERC20(_name, _symbol) {
        maxTotalSupply = _maxTotalSupply;
        for (uint256 i = 0; i < _mintAddresses.length; i++) {
            mint(_mintAddresses[i], 1);
        }
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= maxTotalSupply, "No more tokens available");
        
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}