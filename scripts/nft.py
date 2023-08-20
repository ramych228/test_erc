from brownie import accounts, NFT
from web3 import Web3


def deploy_token():
    max_total_supply = 100
    my_token = NFT.deploy(100, accounts[0], {"from": accounts[0]})

    return my_token


def get_token_balance(account_address):
    my_token = NFT[-1]
    print(f"The account {account_address} has balance {my_token.balanceOf(account_address)}")


def main():
    deploy_token()
    get_token_balance(accounts[0].address)
    get_token_balance(accounts[1].address)
    get_token_balance(accounts[2].address)


main()
