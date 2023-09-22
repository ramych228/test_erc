import { Squid } from "@0xsquid/sdk";
import hardhat from "hardhat";
import { Signer } from "ethers";
import { ethers, artifacts } from "hardhat"
import { TokenA, TokenB } from "../typechain-types"
import { METAMASK_PRIVATE_KEY, ARBITRUM_SQUID_CHAINID, MOONBEAM_SQUID_CHAINID } from '../hardhat.config'



const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://testnet.api.0xsquid.com",
    integratorId: "zoodao-swap-widget"
  });
  return squid;
};



const ethRpcEndPoint = 
  "https://goerli.infura.io/v3/<YOUR_INFURA_KEY_OR_OTHER_RPC_PROVIDER>";

(async () => {
    // set up your RPC provider and signer
    const provider = new ethers.JsonRpcProvider(ethRpcEndPoint);
    const signer = new ethers.Wallet(METAMASK_PRIVATE_KEY, provider);
    
    
    let owner: Signer;
    [owner] = await ethers.getSigners();

    // instantiate the SDK
    const squid = getSDK();
    // init the SDK
    await squid.init();
    console.log("Squid inited");

    const TOKENA_ADDRESS = process.env.TOKENA_ADDRESS as string;
    const TOKENB_ADDRESS = process.env.TOKENB_ADDRESS as string;
    
    const amount = "1000000000000000000";
    const minAmount = "0";

    const tokenB = new ethers.Interface((await artifacts.readArtifact("TokenA")).abi);

    const mintEncodeData = tokenB.encodeFunctionData(
    "mint",
    [
        await owner.getAddress(),
        "1000"
    ]
    );

    

    const { route } = await squid.getRoute({
    fromAddress: await owner.getAddress(),
    toAddress: await owner.getAddress(),
    fromChain: ARBITRUM_SQUID_CHAINID,
    fromToken: TOKENA_ADDRESS,
    fromAmount: amount,
    toChain: MOONBEAM_SQUID_CHAINID,
    toToken: TOKENB_ADDRESS,
    slippage: 99,
    customContractCalls: [
        {
        callType: 1,
        target: TOKENB_ADDRESS,
        value: "0",
        callData: mintEncodeData,
        payload: {
            tokenAddress: TOKENB_ADDRESS,
            inputPos: 1
        },
        estimatedGas: "400000"
        },
    ]
    });

    const tx = await squid.executeRoute({owner, route});
})();