import pytest
from brownie import NFT



@pytest.mark.parametrize("idx", range(6))
def test_limit_minted_tokens(nft, accounts, idx):
    account_balance = nft.balanceOf(accounts[9])
    nft.mint(1, {"from": accounts[9], "value": 1e15})
    assert nft.balanceOf(accounts[9]) == account_balance + 1


@pytest.mark.parametrize("idx", range(5))
def test_limit_one_mint(nft, accounts, idx):
    account_balance = nft.balanceOf(accounts[idx].address)
    nft.mint(idx, {"from": accounts[idx], "value": 1e15 * idx})
    assert nft.balanceOf(accounts[idx].address) == account_balance + idx


@pytest.mark.parametrize("idx", range(2))
def test_mint_cost(nft, accounts, idx):
    account_balance = nft.balanceOf(accounts[idx].address)
    nft.mint(idx, {"from": accounts[idx], "value": 1e15})
    assert nft.balanceOf(accounts[idx].address) == account_balance + idx

# no tests for checking maxTotalSupply because we have only 10 accounts => 60 tokens
