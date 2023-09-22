import { ChainData, Squid } from "@0xsquid/sdk";
import { int } from "hardhat/internal/core/params/argumentTypes";

(async () => {
  // instantiate the SDK
  const squid = new Squid();

  squid.setConfig({
    baseUrl: "https://testnet.api.squidrouter.com", // for mainnet use "https://api.0xsquid.com"
    integratorId: "zoodao-swap-widget"
  });

  // init the SDK
  await squid.init();
  console.log("Squid inited");

  const chains = squid.chains as ChainData[];
  for(let i = 0; i < chains.length; i++) {
    console.log(chains[i].chainName, " ", chains[i].chainId);
  }
})();