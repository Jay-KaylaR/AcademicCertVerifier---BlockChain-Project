/**
 * Deploy script for Hardhat network
 * Usage: npx hardhat run --network localhost scripts/deploy.js
 */
const hre = require("hardhat");

async function main() {
  const Certificate = await hre.ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();
  await certificate.deployed();
  console.log("Certificate deployed to:", certificate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
