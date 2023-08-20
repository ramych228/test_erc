import pytest


@pytest.mark.parametrize("idx", range(2))
def test_ownership(nft, accounts, idx):
    assert nft.withdraw({"from": accounts[idx]})


def test_withdraw(nft, accounts):
    nft.mint(3, {"from": accounts[3], "value": 3e15})
    account_start_balance = accounts[0].balance()
    contract_balance = nft.balance()
    nft.withdraw({"from": accounts[0]})
    assert accounts[0].balance() - account_start_balance == contract_balance


