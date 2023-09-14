import { ethers } from "hardhat";
import { Signer } from "ethers";
import hardhat from "hardhat";
import "hardhat-change-network";
import "dotenv/config";
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { ARBITRUM_GOERLI_ENDPOINT } from '../hardhat.config'


async function main() {
    await hardhat.run("compile");

    const filename: string = "../.env";


    let owner: Signer;

    [owner] = await ethers.getSigners();

    // --------------------------START OFT DEPLOYMENT------------------------------ //

    console.log("Deploying contract with the account:", await owner.getAddress());

    const TokenOFT = await ethers.getContractFactory("TokenOFT");
    const deployedTokenOFT = await TokenOFT.deploy("TokenOFT", "TOFT", ARBITRUM_GOERLI_ENDPOINT);

    console.log(`Deployed OFT contract on:`, await deployedTokenOFT.getAddress());

    // --------------------------END OFT DEPLOYMENT------------------------------ //  

    try {
        await fsPromises.writeFile(join(__dirname, filename), "OFT_ADDRESS=" + (await deployedTokenOFT.getAddress()) + "\n", {
            flag: 'a+',
        });

    } catch (err) {
        console.log(err);
        return 'Something went wrong';
    }
}



main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
