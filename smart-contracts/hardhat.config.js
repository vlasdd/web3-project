/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Define your network configurations here
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/demo", // Replace with your actual network URL
      chainId: 11155111, // Replace with your actual chain ID
      accounts: [], // Optionally add accounts if you need to deploy with specific accounts
    },
  },
  paths: {
    sources: "./contracts", // Solidity source files directory
    tests: "./test", // Test directory
    artifacts: "./artifacts", // Directory for contract artifacts
  },
};
