import { ethers } from "hardhat";
import { Signer } from "ethers";
import { TokenOFT } from "../typechain-types";
import { ARBITRUM_CHAINID } from "../hardhat.config"

async function main() {

    let owner: Signer;

    [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    

    const OFT = await ethers.getContractFactory("TokenOFT");
    const attachedOFT = OFT.attach(process.env.OFT_ADDRESS as string) as TokenOFT;


    let tokensAmount = ethers.parseEther("0.000001");
    let refundAddress = ownerAddress;
    let zroPaymentAddress = ethers.ZeroAddress;
    let adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
    let fees = await attachedOFT.estimateSendFee(
      ARBITRUM_CHAINID, 
      ownerAddress,
      tokensAmount, 
      false, 
      adapterParams
    );

    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.formatEther(fees[0])}`);
    console.log("The tokens amount is " + tokensAmount); 
    console.log("The owner balance: " + await ethers.provider.getBalance(ownerAddress));

    await attachedOFT.sendFrom(
      ownerAddress, 
      ARBITRUM_CHAINID, 
      ownerAddress, 
      tokensAmount, 
      refundAddress, 
      zroPaymentAddress, 
      "0x", 
      {value: fees[0], from: ownerAddress}
    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});