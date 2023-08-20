import pytest


@pytest.fixture(scope="session")
def nft(NFT, accounts):
    return NFT.deploy(100, accounts[0], {'from': accounts[0]})
