# EduVerify

Blockchain-based academic certificate verification system (Ethereum / Hardhat).

Contents:
- contracts/: Solidity contracts
- scripts/: deployment & helper scripts
- client/: simple web UI
- test/: unit tests
- docs/: project documentation

To run (basic):
1. Install dependencies: `npm install`
2. Start Hardhat local node: `npx hardhat node`
3. Deploy: `npx hardhat run --network localhost scripts/deploy.js`
4. Open client/index.html and set contract address in app.js

This package is a starter template for the project submission.
