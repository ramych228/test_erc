from brownie import accounts, NFT


def deploy_token():
    max_total_supply = 100
    account_main = accounts.load(2)
    my_token = NFT.deploy(max_total_supply, account_main, {"from": account_main}, publish_source=True)

    return my_token


def get_token_balance(account_address):
    my_token = NFT[-1]
    print(f"The account {account_address} has balance {my_token.balanceOf(account_address)}")


def main():
    deploy_token()


main()
