import { ethers } from "hardhat";
import { Signer } from "ethers";
import hardhat from "hardhat";
import { Token } from "../typechain-types"
import "dotenv/config";


async function main() {
    await hardhat.run("compile");

    const filename: string = "../.env";

    let owner: Signer;

    [owner] = await ethers.getSigners();

    const ownerAddress = await owner.getAddress();
    
    const Token = await ethers.getContractFactory("Token");
    const attachedToken = Token.attach(process.env.TOKEN_ADDRESS as string) as Token;

    await attachedToken.mint(ownerAddress, 1000000);

    console.log(`Minted tokens on:`, ownerAddress);
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
