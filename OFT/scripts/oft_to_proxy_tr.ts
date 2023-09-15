import { ethers } from "hardhat";
import hardhat from "hardhat";
import { TokenOFT } from "../typechain-types"
import { ARBITRUM_CHAINID } from "../hardhat.config"
import "dotenv/config";


async function main() {
  const TokenOFT = await ethers.getContractFactory("TokenOFT");

  const attachedTokenOFT = TokenOFT.attach(process.env.OFT_ADDRESS as string) as TokenOFT;

  const remoteAndLocal = ethers.solidityPacked(
    ['address', 'address'],
    [process.env.PROXY_ADDRESS, process.env.OFT_ADDRESS]
  )

  const isTrustedRemoteSet = await attachedTokenOFT.isTrustedRemote(ARBITRUM_CHAINID, remoteAndLocal);

  if (!isTrustedRemoteSet) {
    await (await attachedTokenOFT.setTrustedRemote(ARBITRUM_CHAINID, remoteAndLocal)).wait()
    console.log(`✅ [${hardhat.network.name}] setTrustedRemote(${ARBITRUM_CHAINID}, ${remoteAndLocal})`)
  } else {
    console.log("*source already set*")
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});