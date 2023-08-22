import brownie
import pytest


@pytest.mark.parametrize("idx", range(6))
def test_limit_minted_tokens(nft, accounts, idx):
    account_balance = nft.balanceOf(accounts[9])
    nft.mint(1, {"from": accounts[9], "value": 1e15})
    assert nft.balanceOf(accounts[9]) == account_balance + 1


def test_exception_max_user_balance(nft, accounts):
    with brownie.reverts("NFT: User can't have more than 6 tokens"):
        nft.mint(1, {"from": accounts[9], "value": 1e15})


@pytest.mark.parametrize("idx", range(4))
def test_limit_one_mint(nft, accounts, idx):
    account_balance = nft.balanceOf(accounts[idx].address)
    nft.mint(idx, {"from": accounts[idx], "value": 1e15 * idx})
    assert nft.balanceOf(accounts[idx].address) == account_balance + idx


def test_exception_max_mint(nft, accounts):
    with brownie.reverts("NFT: User can't mint more than 3 tokens in one mint"):
        nft.mint(4, {"from": accounts[4], "value": 1e15})


def test_mint_cost(nft, accounts):
    account_balance = nft.balanceOf(accounts[1].address)
    nft.mint(1, {"from": accounts[1], "value": 1e15})
    assert nft.balanceOf(accounts[1].address) == account_balance + 1


def test_exception_mint_cost(nft, accounts):
    with brownie.reverts("NFT: User must pay exact 0.001 ether for one token minting"):
        nft.mint(2, {"from": accounts[2], "value": 1e15})


# no tests for checking maxTotalSupply because we have only 10 accounts => 60 tokens
