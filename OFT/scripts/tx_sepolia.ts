import { ethers } from "hardhat";
import { AddressLike, Signer } from "ethers";
import { ARBITRUM_GOERLI_CHAINID, SEPOLIA_CHAINID } from "../hardhat.config"

async function main() {

    let owner: Signer;

    [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    

    const Token = await ethers.getContractFactory("Token");
    const attachedToken = Token.attach(process.env.TOKEN_ADDRESS as string);

    const Proxy = await ethers.getContractFactory("Proxy");
    const attachedProxy = Proxy.attach(process.env.PROXY_ADDRESS as string);

    let tokensAmount = ethers.parseEther("0.1");
    let refundAddress = ownerAddress;
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [2, 10])
    let fees = await attachedProxy.estimateSendFee(ARBITRUM_GOERLI_CHAINID, ownerAddress, tokensAmount, false, adapterParams, {from: ownerAddress});

    console.log("The fee amount is " + fees[0]); 

    attachedToken.approve(process.env.PROXY_ADDRESS as string, tokensAmount, {from: ownerAddress});
    await attachedProxy.sendFrom(ownerAddress, ARBITRUM_GOERLI_CHAINID, ownerAddress, tokensAmount, 
        refundAddress, zroPaymentAddress, "0x", {value: fees[0], from: ownerAddress});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});