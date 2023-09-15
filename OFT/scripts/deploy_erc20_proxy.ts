import { ethers } from "hardhat";
import { Signer } from "ethers";
import hardhat from "hardhat";
import "hardhat-change-network";
import "dotenv/config";
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { ARBITRUM_ENDPOINT } from '../hardhat.config'

async function main() {
  await hardhat.run("compile");

  const filename: string = "../.env";

  let owner: Signer;

  [owner] = await ethers.getSigners();

  // --------------------------START TOKEN DEPLOYMENT------------------------------ //

  console.log("Deploying contract with the account:", await owner.getAddress());
  console.log("Deploying contract on this network:", owner.provider);


  const Token = await ethers.getContractFactory("Token");

  const deployedToken = await Token.deploy("Token", "TKN", ethers.parseEther('1000000'),
    ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      , "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      , "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]);

  deployedToken.waitForDeployment();

  console.log(`Deployed ${deployedToken.name} contract on:`, await deployedToken.getAddress());

  // --------------------------END TOKEN DEPLOYMENT------------------------------ //


  // --------------------------START PROXY DEPLOYMENT------------------------------ //

  console.log("Deploying contract with the account:", await owner.getAddress());
  console.log("Deploying contract on this network:", owner.provider);

  const Proxy = await ethers.getContractFactory("Proxy");
  const deployedProxy = await Proxy.deploy("Proxy", ARBITRUM_ENDPOINT, await deployedToken.getAddress());

  console.log(`Deployed Proxy contract on:`, await deployedProxy.getAddress());

  // --------------------------END PROXY DEPLOYMENT------------------------------ //

  try {
    await fsPromises.writeFile(join(__dirname, filename), "TOKEN_ADDRESS=" + (await deployedToken.getAddress()) + "\n" +
      "PROXY_ADDRESS=" + (await deployedProxy.getAddress()) + "\n", {
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
