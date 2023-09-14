import { ethers } from "hardhat";
import { AddressLike, Signer } from "ethers";
import { ARBITRUM_GOERLI_CHAINID, SEPOLIA_CHAINID } from "../hardhat.config"

async function main() {

    let owner: Signer;

    [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    

    const OFT = await ethers.getContractFactory("TokenOFT");
    const attachedOFT = OFT.attach(process.env.OFT_ADDRESS as string);


    let tokensAmount = ethers.parseEther("0.1");
    let refundAddress = ownerAddress;
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 1])
    let fees = await attachedOFT.estimateSendFee(SEPOLIA_CHAINID, ownerAddress, tokensAmount, false, adapterParams, {from: ownerAddress});

    console.log("The fee amount is " + fees[0]); 

    await attachedOFT.sendFrom(ownerAddress, ARBITRUM_GOERLI_CHAINID, ownerAddress, tokensAmount, 
        refundAddress, zroPaymentAddress, "0x", {value: fees[0], from: ownerAddress});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});