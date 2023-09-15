import { ethers } from "hardhat";
import hardhat from "hardhat";
import { Proxy } from "../typechain-types";
import { MOONBEAM_CHAINID } from "../hardhat.config"
import "dotenv/config";


async function main() {
  const ProxyF = await ethers.getContractFactory("Proxy");

  const attachedProxy = ProxyF.attach(process.env.PROXY_ADDRESS as string) as Proxy;

  const remoteAndLocal = ethers.solidityPacked(
    ['address', 'address'],
    [process.env.OFT_ADDRESS, process.env.PROXY_ADDRESS]
  )

  const isTrustedRemoteSet = await attachedProxy.isTrustedRemote(MOONBEAM_CHAINID, remoteAndLocal);

  if (!isTrustedRemoteSet) {
    await (await attachedProxy.setTrustedRemote(MOONBEAM_CHAINID, remoteAndLocal)).wait()
    console.log(`✅ [${hardhat.network.name}] setTrustedRemote(${MOONBEAM_CHAINID}, ${remoteAndLocal})`)
  } else {
    console.log("*source already set*")
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});