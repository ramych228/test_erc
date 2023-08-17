//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;
    uint public _totalSupply = 0;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSuppl,
        address[] memory _mintAddresses
    ) ERC20(_name, _symbol) {
        owner = msg.sender;
        for (uint256 i = 0; i < _mintAddresses.length; i++) {
            mint(_mintAddresses[i], 1e4);
        }
    }

    function mint(address to, uint256 amount) public {
        require(owner == msg.sender, "You are not owner of this contract");
        require(_totalSupply + amount <= 1e6, "No more tokens available");
        _totalSupply += amount;

        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _totalSupply -= amount;

        _burn(msg.sender, amount);
    }
}
