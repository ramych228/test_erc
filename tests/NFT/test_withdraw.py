import brownie
import pytest


def test_ownership(nft, accounts):
    assert nft.withdraw({"from": accounts[0]})


def test_exception_ownership(nft, accounts):
    with brownie.reverts("Ownable: caller is not the owner"):
        nft.withdraw({"from": accounts[2]})


def test_withdraw(nft, accounts):
    nft.mint(3, {"from": accounts[3], "value": 3e15})
    account_start_balance = accounts[0].balance()
    contract_balance = nft.balance()
    nft.withdraw({"from": accounts[0]})
    assert accounts[0].balance() - account_start_balance == contract_balance
