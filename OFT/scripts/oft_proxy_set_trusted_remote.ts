import { ethers } from "hardhat";
import { Proxy } from "../typechain-types";
import { ARBITRUM_GOERLI_CHAINID, SEPOLIA_CHAINID } from "../hardhat.config"
import "dotenv/config";


async function main() {

    let attachedProxy: Proxy;

    const Proxy = await ethers.getContractFactory("Proxy");

    attachedProxy = Proxy.attach(process.env.PROXY_ADDRESS as string);

    console.log("test:", ARBITRUM_GOERLI_CHAINID, process.env.OFT_ADDRESS as string, await attachedProxy.getAddress())
    
    await attachedProxy.setTrustedRemoteAddress(ARBITRUM_GOERLI_CHAINID, process.env.OFT_ADDRESS as string); 

    let res = await attachedProxy.isTrustedRemote(ARBITRUM_GOERLI_CHAINID, process.env.OFT_ADDRESS as string);
    console.log(res);

    res = await attachedProxy.isTrustedRemote(ARBITRUM_GOERLI_CHAINID, process.env.PROXY_ADDRESS as string);
    console.log(res);

    res = await attachedProxy.isTrustedRemote(SEPOLIA_CHAINID, process.env.OFT_ADDRESS as string);
    console.log(res);

    res = await attachedProxy.isTrustedRemote(SEPOLIA_CHAINID, process.env.PROXY_ADDRESS as string);
    console.log(res);

    console.log("Called function setTrustedRemoteAddress");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});