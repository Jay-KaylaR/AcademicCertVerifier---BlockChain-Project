const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Certificate contract", function () {
  let Certificate, cert, owner, addr1;

  beforeEach(async function () {
    Certificate = await ethers.getContractFactory("Certificate");
    [owner, addr1] = await ethers.getSigners();
    cert = await Certificate.deploy();
    await cert.deployed();
  });

  it("should issue and verify a certificate", async function () {
    await cert.issueCertificate("C001", "Alice", "Blockchain 101", "University X");
    const res = await cert.verifyCertificate("C001");
    expect(res[0]).to.equal("Alice");
    expect(res[1]).to.equal("Blockchain 101");
    expect(res[2]).to.equal("University X");
    expect(res[4]).to.equal(true);
  });

  it("should allow only admin to issue", async function () {
    await expect(
      cert.connect(addr1).issueCertificate("C002", "Bob", "CS", "U")
    ).to.be.revertedWith("Not authorized");
  });

  it("should revoke certificate", async function () {
    await cert.issueCertificate("C003", "Eve", "Math", "College");
    await cert.revokeCertificate("C003");
    const res = await cert.verifyCertificate("C003");
    expect(res[4]).to.equal(false);
  });
});
