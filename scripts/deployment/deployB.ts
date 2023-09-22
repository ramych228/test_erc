import { ethers } from "hardhat";
import { Signer } from "ethers";
import hardhat from "hardhat";
import "dotenv/config";
import { promises as fsPromises } from 'fs';
import { join } from 'path';

async function main() {
  await hardhat.run("compile");

  const filename: string = "../../.env";

  let owner: Signer;

  [owner] = await ethers.getSigners();

  console.log("Deploying contract with the account:", owner.getAddress());
  

  const TokenB = await ethers.getContractFactory("TokenB");
  const deployedTokenB = await TokenB.deploy("TokenB", "TKNB");

  console.log(`Deployed TokenB contract on:`, await deployedTokenB.getAddress());

  try {
    await fsPromises.writeFile(join(__dirname, filename), 
      "TOKENB_ADDRESS=" + (await deployedTokenB.getAddress()) + "\n", {
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