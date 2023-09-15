import { ethers } from "hardhat";
import { Signer } from "ethers";
import { Proxy, Token } from "../typechain-types";
import { MOONBEAM_CHAINID } from "../hardhat.config"

async function main() {

    let owner: Signer;

    [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();

    const Token = await ethers.getContractFactory("Token");
    const attachedToken = Token.attach(process.env.TOKEN_ADDRESS as string) as Token;

    const ProxyF = await ethers.getContractFactory("Proxy");
    const attachedProxy = ProxyF.attach(process.env.PROXY_ADDRESS as string) as Proxy;

    let tokensAmount = 100000;
    let refundAddress = ownerAddress;
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
    let fees = await attachedProxy.estimateSendFee(
      MOONBEAM_CHAINID, 
      ownerAddress, 
      tokensAmount, 
      false, 
      adapterParams
    );

    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.formatEther(fees[0])}`);
    console.log("The tokens amount is " + ethers.formatEther(tokensAmount)); 
    console.log("The owner balance: " + ethers.formatEther(await ethers.provider.getBalance(ownerAddress)));

    attachedToken.approve(process.env.PROXY_ADDRESS as string, fees[0], {from: ownerAddress});

    const accountNonce = await owner.getNonce() + 1;

  
  

    await attachedProxy.sendFrom(
      ownerAddress, 
      MOONBEAM_CHAINID, 
      ownerAddress, 
      tokensAmount, 
      refundAddress, 
      zroPaymentAddress, 
      "0x", 
      {value: fees[0], from: owner, nonce: accountNonce}
    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});