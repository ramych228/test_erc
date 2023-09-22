import { ethers } from "hardhat";
import { Signer } from "ethers";
import hardhat from "hardhat";
import "dotenv/config";
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { METAMASK_PRIVATE_KEY, SEPOLIA_URL } from '../../hardhat.config'

async function main() {
  await hardhat.run("compile");

  const filename: string = "../../.env";

  let owner: Signer;

  [owner] = await ethers.getSigners();

  // --------------------------START TOKEN DEPLOYMENT------------------------------ //

  console.log("Deploying contract with the account:", await owner.getAddress());

  const TokenA = await ethers.getContractFactory("TokenA");

  const deployedTokenA = await TokenA.deploy("TokenA", "TKNA");

  await deployedTokenA.waitForDeployment();

  console.log(`Deployed TokenA contract on:`, await deployedTokenA.getAddress());

  // --------------------------END TOKEN DEPLOYMENT------------------------------ //

  try {
    await fsPromises.writeFile(join(__dirname, filename), "TOKENA_ADDRESS=" + (await deployedTokenA.getAddress()) + "\n",
      {
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