import pytest


@pytest.mark.parametrize("idx", range(10))
def test_constructor_mint(token, accounts, idx):
    assert token.balanceOf(accounts[idx]) == 1e4


@pytest.mark.parametrize("idx", range(10))
def test_mint(token, accounts, idx):
    account_idx_balance = token.balanceOf(accounts[idx].address)
    token.mint(accounts[idx], 1e5)
    assert token.balanceOf(accounts[idx].address) == account_idx_balance + 1e5


def test_burn(token, accounts):
    account_idx_balance = token.balanceOf(accounts[0])
    token.burn(1e3)
    assert token.balanceOf(accounts[0].address) == account_idx_balance - 1e3

