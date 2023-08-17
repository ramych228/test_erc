from brownie import accounts, Token
from web3 import Web3


def deploy_token():
    initial_supply = Web3.toWei(21_000_000, "ether")
    my_token = Token.deploy("Token", "TKN", initial_supply, list(accounts), {"from": accounts[0]})

    return my_token


def get_token_balance(account_address):
    my_token = Token[-1]
    print(f"The account {account_address} has balance {my_token.balanceOf(account_address)}")


def main():
    deploy_token()
    get_token_balance(accounts[0].address)
    get_token_balance(accounts[1].address)
    get_token_balance(accounts[2].address)


main()
