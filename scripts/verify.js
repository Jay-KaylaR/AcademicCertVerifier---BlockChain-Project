/**
 * Simple script to call verifyCertificate on a deployed contract
 * node scripts/verify.js <contractAddress> <certId>
 */
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("Usage: node scripts/verify.js <contractAddress> <certId>");
    return;
  }
  const [address, certId] = args;
  const Certificate = await ethers.getContractFactory("Certificate");
  const cert = Certificate.attach(address);
  const data = await cert.verifyCertificate(certId);
  console.log("Certificate:", data);
}

main().catch((e)=>{ console.error(e); process.exit(1); });
