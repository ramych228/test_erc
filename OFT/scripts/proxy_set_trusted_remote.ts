import { ethers } from "hardhat";
import { ARBITRUM_GOERLI_CHAINID, SEPOLIA_CHAINID } from "../hardhat.config"
import "dotenv/config";


async function main() {

    let TokenOFT = await ethers.getContractFactory("TokenOFT");

    let attachedTokenOFT = TokenOFT.attach(process.env.OFT_ADDRESS as string);

    console.log("test:", SEPOLIA_CHAINID, process.env.PROXY_ADDRESS as string, await attachedTokenOFT.getAddress())
    
    await attachedTokenOFT.setTrustedRemoteAddress(ARBITRUM_GOERLI_CHAINID, process.env.OFT_ADDRESS as string); 

    let res = await attachedTokenOFT.isTrustedRemote(ARBITRUM_GOERLI_CHAINID, process.env.OFT_ADDRESS as string);
    console.log(res);

    res = await attachedTokenOFT.isTrustedRemote(ARBITRUM_GOERLI_CHAINID, process.env.PROXY_ADDRESS as string);
    console.log(res);

    res = await attachedTokenOFT.isTrustedRemote(SEPOLIA_CHAINID, process.env.OFT_ADDRESS as string);
    console.log(res);

    res = await attachedTokenOFT.isTrustedRemote(SEPOLIA_CHAINID, process.env.PROXY_ADDRESS as string);
    console.log(res);

    console.log("Called function setTrustedRemoteAddress");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});