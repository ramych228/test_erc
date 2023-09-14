import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";


export const ARBITRUM_GOERLI_ENDPOINT = "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab";
export const ARBITRUM_GOERLI_CHAINID = 10143;
export const SEPOLIA_ENDPOINT = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1";
export const SEPOLIA_CHAINID = 10161;


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY as string}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY as string],
      gasPrice: 1,
      gas: 1
    },
    arbitrum_goerli: {
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ARBITRUM_GOERLI_API_KEY as string}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY as string],
      gasPrice: 1,
      gas: 1
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY as string,
      arbitrumGoerli: process.env.ARBISCAN_API_KEY as string
    }
  }                                            
};

export default config;
