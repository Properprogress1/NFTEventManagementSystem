import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const { SEPOLIA_URL, PRIVATE_KEY, ETHERSCAN_KEY } = process.env;
// const { SEPOLIA_URL, LOCAL_PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

if (!SEPOLIA_URL || !PRIVATE_KEY || !ETHERSCAN_KEY) {
  throw new Error("Please set SEPOLIA_URL, PRIVATE_KEY, and ETHERSCAN_KEY in your .env file");
}
// if (!SEPOLIA_URL || !LOCAL_PRIVATE_KEY || !ETHERSCAN_KEY) {
//   throw new Error("Please set SEPOLIA_URL, PRIVATE_KEY, and ETHERSCAN_KEY in your .env file");
// }

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_URL || "",
      // accounts: LOCAL_PRIVATE_KEY ? [LOCAL_PRIVATE_KEY] : [],
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};

export default config;
